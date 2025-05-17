import command from "./command";
import wrapper from "../../../helpers/wrapper";
import {
  UnprocessableEntityError,
  InternalServerError,
  NotFoundError,
} from "../../../helpers/error";

class CommandDomain {
  async create(payload: ToddlersData[]) {
    const createData: UploadDataPayload[] = payload.map((item) => ({
      name: item.name,
      gender: item.gender.toString(),
      age: item.age,
      weight: item.weight.toString(),
      height: item.weight.toString(),
      lila: item.lila.toString(),
      status: item.status,
      created_at: new Date(),
    }));

    const { data, err } = await command.create(createData);
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }

  async clean() {
    const { data, err } = await command.clean();
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }
}

export default new CommandDomain();
