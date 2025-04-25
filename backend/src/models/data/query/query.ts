import wrapper from "../../../helpers/wrapper";
import db from "../../../config/db";
const tableName = "toddlers";

class Query {
  async findAll(params: ListParams) {
    try {
      const result = await db(tableName)
        .select("*")
        .modify((queryBuilder) => {
          if (params.search) {
            queryBuilder.where("name", "like", `%${params.search}%`);
          }
          if (params.gizi) {
            queryBuilder.andWhere("status", params.gizi);
          }
          if (params.gender) {
            queryBuilder.andWhere("gender", params.gender);
          }
        })
        .limit(params.size)
        .offset((params.page - 1) * params.size);

      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async countData(params: ListParams) {
    try {
      const result = await db(tableName)
        .count("* as total")
        .modify((queryBuilder) => {
          if (params.search) {
            queryBuilder.where("name", "like", `%${params.search}%`);
          }
          if (params.gizi) {
            queryBuilder.andWhere("status", params.gizi);
          }
          if (params.gender) {
            queryBuilder.andWhere("gender", params.gender);
          }
        })
        .first();

      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }

  async findById(id: number) {
    try {
      const result = await db(tableName).select("*").where({ id }).first();
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error as string);
    }
  }
}

export default new Query();
