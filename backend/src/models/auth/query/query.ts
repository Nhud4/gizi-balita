import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "users";

class Query {
  async getByUsername(username: string) {
    try {
      const user = await db(tableName)
        .select("*")
        .where("username", username)
        .first();

      return wrapper.data(user);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async getById(id: string) {
    try {
      const user = await db(tableName).select("*").where("id", id).first();

      return wrapper.data(user);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Query();
