import command from "./command";
import wrapper from "../../../helpers/wrapper";
import { InternalServerError } from "../../../helpers/error";
import { hash } from "../../../helpers/crypt";

class CommandDomain {
  async createUser(payload: CreateUserPayload) {
    try {
      payload.password = hash(payload.password);

      const result = await command.createUser(payload);
      return wrapper.data(result);
    } catch (error) {
      return { err: new InternalServerError(error as string) };
    }
  }
}

export default new CommandDomain();
