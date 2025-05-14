import fs from "fs";
import csv from "csv-parser";
import command from "./command";
import query from "../query/query";
import wrapper from "../../../helpers/wrapper";
import {
  UnprocessableEntityError,
  InternalServerError,
  NotFoundError,
} from "../../../helpers/error";
import {
  smoteToddlers,
  dataNormalization,
  minimumFilter,
  maximumFilter,
  knnToddlers,
  dataDenormalization,
} from "../../../config/algo";

class CommandDomain {
  async uploadData(file: Express.Multer.File | undefined) {
    if (!file) {
      return {
        err: new UnprocessableEntityError("File not found"),
        data: null,
      };
    }

    // read file and parse csv
    const results: UploadDataPayload[] = [];
    const parsedData = await new Promise<UploadDataPayload[]>(
      (resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(csv())
          .on("data", (data) => {
            const mapped = {
              name: (data["Nama"] as string).toUpperCase(),
              gender: (data["JK"] as string).toUpperCase(),
              age: parseInt(data["Usia (Bulan)"]),
              weight: data["Berat"],
              height: data["Tinggi"],
              lila: data["LiLA"],
              status: data["Status Gizi"] === "Gizi Normal" ? "0" : "1",
              created_at: new Date(data["Tanggal"]),
            };
            results.push(mapped);
          })
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err));
      }
    );

    const { data, err } = await command.bulkCreate(parsedData);
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    fs.unlinkSync(file.path);
    return wrapper.data(data);
  }

  async create(payload: CreateDataPayload) {
    // get all data
    const { data, err } = await query.findAllData();
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    const dataNormal = (data as DataList[]).map((item) => ({
      id: item.id,
      name: item.name,
      gender: item.gender === "L" ? 1 : 0,
      age: item.age,
      weight: parseFloat(item.weight),
      height: parseFloat(item.height),
      lila: parseFloat(item.lila),
      status: item.status,
    }));

    // get total data
    const { data: total, err: totalErr } = await query.totalData();
    if (totalErr) {
      return {
        err: new InternalServerError(totalErr as string),
        data: null,
      };
    }

    const totalStatus0 = (total as TotalData[])
      .filter((item) => item.status === "0")
      .map((item) => item.total)[0];
    const totalStatus1 = (total as TotalData[])
      .filter((item) => item.status === "1")
      .map((item) => item.total)[0];

    // get min data
    const min = minimumFilter(dataNormal);

    // get max data
    const max = maximumFilter(dataNormal);

    // filter minimum data
    let minStatus = "";
    let totalDistance = 0;
    if (totalStatus0 < totalStatus1) {
      minStatus = "0";
      totalDistance = totalStatus1 - totalStatus0;
    }

    if (totalStatus1 < totalStatus0) {
      minStatus = "1";
      totalDistance = totalStatus0 - totalStatus1;
    }

    const minority = dataNormal.filter((item) => item.status === minStatus);

    // SMOTE
    const lastId = (data as DataList[])
      .map((item) => item.id)
      .sort((a, b) => b - a)
      .slice(0, 1)[0];
    const smote = smoteToddlers(minority, 3, totalDistance, lastId);

    const joinData = [...data, ...smote] as ToddlersData[];

    // data normalization
    const normalization = joinData.map((item) => ({
      id: item.id,
      name: item.name,
      gender: item.gender.toString() === "L" ? 1 : 0,
      age: dataNormalization(item.age, min.age, max.age),
      weight: dataNormalization(item.weight, min.weight, max.weight),
      height: dataNormalization(item.height, min.height, max.height),
      lila: dataNormalization(item.lila, min.lila, max.lila),
      status: item.status,
    }));

    // KNN
    const knn = knnToddlers(normalization, payload);
    const neighbor = knn.neighbor.map((item) => ({
      ...item,
      age: dataDenormalization(item.age, min.age, max.age),
      weight: dataDenormalization(item.weight, min.weight, max.weight),
      height: dataDenormalization(item.height, min.height, max.height),
      lila: dataDenormalization(item.lila, min.lila, max.lila),
    }));

    // insert data
    const { err: insertErr } = await command.createData({
      name: payload.name,
      gender: payload.gender,
      age: payload.age,
      weight: payload.weight,
      height: payload.height,
      lila: payload.lila,
      status: knn.payload.status,
    });
    if (insertErr) {
      return {
        err: new InternalServerError(insertErr as string),
        data: null,
      };
    }

    return wrapper.data({ ...knn, neighbor });
  }

  async update(payload: UpdateData) {
    const { data: user, err: userErr } = await query.findById(payload.id);
    if (!user) {
      return {
        err: new NotFoundError("User data not found"),
        data: null,
      };
    }
    if (userErr) {
      return {
        err: new InternalServerError(userErr as string),
        data: null,
      };
    }

    const { data: update, err: updateErr } = await command.updateData(payload);
    if (updateErr) {
      return {
        err: new InternalServerError(updateErr as string),
        data: null,
      };
    }

    return wrapper.data(update);
  }

  async delete(payload: { id: number }) {
    const { data: user, err: userErr } = await query.findById(payload.id);
    if (!user) {
      return {
        err: new NotFoundError("User data not found"),
        data: null,
      };
    }
    if (userErr) {
      return {
        err: new InternalServerError(userErr as string),
        data: null,
      };
    }

    const { data: remove, err: removeErr } = await command.removeData(
      payload.id
    );
    if (removeErr) {
      return {
        err: new InternalServerError(removeErr as string),
        data: null,
      };
    }

    return wrapper.data(remove);
  }

  async deleteAll() {
    const { data, err } = await command.removeAllData();
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }
}

export default new CommandDomain();
