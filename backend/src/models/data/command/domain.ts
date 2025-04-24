import fs from "fs";
import csv from "csv-parser";
import command from "./command";
import wrapper from "../../../helpers/wrapper";
import {
  UnprocessableEntityError,
  InternalServerError,
} from "../../../helpers/error";

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
}

export default new CommandDomain();
