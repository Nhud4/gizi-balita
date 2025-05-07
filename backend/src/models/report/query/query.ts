import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "toddlers";

class Query {
  async countAll() {
    try {
      const result = await db(tableName).count("* as total").first();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async countByStatus(status: string) {
    try {
      const result = await db(tableName)
        .count("* as total")
        .where("status", status)
        .first();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async percentageGizi(start: string, end: string) {
    try {
      const result = await db(tableName)
        .count("* as total")
        .whereBetween("created_at", [start, end])
        .groupBy("status");
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async percentageGender(start: string, end: string) {
    try {
      const result = await db(tableName)
        .count("* as total")
        .whereBetween("created_at", [start, end])
        .groupBy("gender");
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async grafikAge(payload: AgePayload) {
    try {
      const result = await db(tableName)
        .count("* as total")
        .whereBetween("age", [payload.min, payload.max])
        .andWhereBetween("created_at", [payload.start, payload.end])
        .first();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async grafikGizi(start: string, end: string, status: string) {
    try {
      const result = await db(tableName)
        .select(
          db.raw("MONTH(created_at) as month"),
          db.raw("COUNT(*) as total")
        )
        .where("status", status)
        .andWhereBetween("created_at", [start, end])
        .groupByRaw("MONTH(created_at)")
        .orderBy("month", "asc");

      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Query();
