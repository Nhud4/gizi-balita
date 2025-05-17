import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "synthetic";

class Query {
  async list(params: ListParams) {
    try {
      const result = await db(tableName)
        .select("*")
        .limit(params.size)
        .offset((params.page - 1) * params.size)
        .orderBy("created_at", "desc");

      return wrapper.data(result);
    } catch (error) {
      throw wrapper.error(error as string);
    }
  }

  async count(params: ListParams) {
    try {
      const result = await db(tableName).count("* as total").first();

      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async totalSynthetic() {
    try {
      const result = await db(tableName)
        .count("id as total")
        .select("status")
        .groupBy("status");
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async totalData(lastId: number) {
    try {
      const result = await db("toddlers")
        .count("id as total")
        .select("status")
        .where("id", "<", lastId)
        .groupBy("status");
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async getLatsData() {
    try {
      const result = await db("toddlers")
        .select("*")
        .orderBy("id", "desc")
        .first();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Query();
