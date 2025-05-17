import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "synthetic";

class Command {
  async create(payload: UploadDataPayload[]) {
    try {
      const result = await db.batchInsert(tableName, payload, payload.length);
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async clean() {
    try {
      const result = await db(tableName).truncate();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Command();
