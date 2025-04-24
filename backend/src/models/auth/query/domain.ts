import query from "./query";
import wrapper from "../../../helpers/wrapper";
import { NotFoundError, InternalServerError } from "../../../helpers/error";

class QueryDomain {
  async getProfile(payload: TokenResponse) {
    const { data, err } = await query.getById(payload.userId.toString());
    if (err) {
      return { err: new InternalServerError(err as string), data: null };
    }

    if (!data) {
      return { err: new NotFoundError(err as string), data: null };
    }

    const user = {
      id: data.id,
      username: data.username,
      name: data.name,
      registeredAt: data.created_at,
    };

    return wrapper.data(user);
  }
}

export default new QueryDomain();
