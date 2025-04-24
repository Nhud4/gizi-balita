import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "toddlers";

class Command {
  async bulkCreate(payload: UploadDataPayload[]) {
    try {
      const result = await db.batchInsert(tableName, payload, payload.length);
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Command();
