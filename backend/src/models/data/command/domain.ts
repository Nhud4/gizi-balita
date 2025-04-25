import fs from "fs";
import csv from "csv-parser";
import command from "./command";
import query from "../query/query";
import wrapper from "../../../helpers/wrapper";
import {
  UnprocessableEntityError,
  InternalServerError,
} from "../../../helpers/error";
import {
  smoteToddlers,
  dataNormalization,
  minimumFilter,
  maximumFilter,
  knnToddlers,
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
              age: data["Usia (Bulan)"],
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

    // get total data
    const { data: total, err: totalErr } = await query.totalData();
    const totalStatus0 = (total as TotalData[])
      .filter((item) => item.status === "0")
      .map((item) => item.total)[0];
    const totalStatus1 = (total as TotalData[])
      .filter((item) => item.status === "1")
      .map((item) => item.total)[0];

    // get min data
    const min = minimumFilter(data);

    // get max data
    const max = maximumFilter(data);

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

    const minority = (data as DataList[]).filter(
      (item) => item.status === minStatus
    );

    // data normalization
    const mapped = minority.map((item) => ({
      id: item.id,
      name: item.name,
      gender: item.gender === "L" ? 1 : 0,
      age: parseFloat(item.age),
      weight: parseFloat(item.weight),
      height: parseFloat(item.height),
      lila: parseFloat(item.lila),
      status: item.status,
    }));

    // SMOTE
    const lastId = (data as DataList[])
      .map((item) => item.id)
      .sort((a, b) => b - a)
      .slice(0, 1)[0];
    const smote = smoteToddlers(mapped, 3, totalDistance, lastId);

    const joinData = [...data, ...smote];

    // data normalization
    const normalization = (joinData as ToddlersData[]).map((item) => ({
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

    // insert data
    const { data: insert, err: insertErr } = await command.createData({
      name: payload.name,
      gender: payload.gender,
      age: payload.age,
      weight: payload.weight,
      height: payload.height,
      lila: payload.lila,
      status: knn.payload.status,
    });

    return wrapper.data(knn);
  }
}

export default new CommandDomain();
