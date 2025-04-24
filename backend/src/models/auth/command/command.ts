import db from "../../../config/db";
const tableName = "users";

class Command {
  async createUser(payload: CreateUserPayload) {
    await db(tableName)
      .insert(payload)
      .then(() => {
        return null;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default new Command();
