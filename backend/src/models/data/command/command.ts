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

  async createData(payload: InsertData) {
    try {
      const result = await db(tableName).insert(payload);
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async updateData(payload: UpdateData) {
    try {
      const result = await db(tableName)
        .where("id", payload.id)
        .update(payload);
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async removeData(id: number) {
    try {
      const result = await db(tableName).where({ id }).del();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async removeAllData() {
    try {
      const result = await db(tableName).del();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Command();
