import command from "./command";
import query from "../query/query";
import wrapper from "../../../helpers/wrapper";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../helpers/error";
import { hash, compareHash } from "../../../helpers/crypt";
import { generateToken } from "../../../middlewares/auth";

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

  async login(payload: LoginPayload) {
    const { data: user, err: userErr } = await query.getByUsername(
      payload.username
    );

    if (userErr) {
      return {
        err: new InternalServerError(userErr as string),
        data: null,
      };
    }

    if (!user) {
      return {
        err: new NotFoundError("User not found"),
        data: null,
      };
    }

    const isPasswordValid = compareHash(payload.password, user.password);
    if (!isPasswordValid) {
      return {
        err: new UnprocessableEntityError("Invalid password"),
        data: null,
      };
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);

    const token = generateToken(user.id, user.username);
    const expiresIn = date.toISOString();

    return wrapper.data({ token, expiresIn });
  }
}

export default new CommandDomain();
