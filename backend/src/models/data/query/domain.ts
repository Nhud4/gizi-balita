import wrapper from "../../../helpers/wrapper";
import { NotFoundError, InternalServerError } from "../../../helpers/error";
import query from "./query";

class QueryDomain {
  async list(params: ListParams) {
    const { data: list, err: listErr } = await query.findAll(params);
    const { data: count, err: countErr } = await query.countData(params);

    const meta = {
      page: parseInt(params.page.toString(), 10),
      totalPage: 0,
      totalData: 0,
      totalDataOnPage: parseInt(params.size.toString(), 10),
    };

    if (listErr || countErr) {
      return {
        err: new InternalServerError(
          (listErr as string) || (countErr as string)
        ),
        data: null,
        meta,
      };
    }

    if (!list || count.total === 0) {
      return wrapper.data([], meta);
    }

    meta.totalData = parseInt(count.total.toString(), 10);
    meta.totalPage = Math.ceil(count.total / params.size);

    return wrapper.data(list, meta);
  }

  async detail(id: number) {
    const { data, err } = await query.findById(id);

    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    if (!data) {
      return {
        err: new NotFoundError("Data not found"),
        data: null,
      };
    }

    return wrapper.data(data);
  }
}

export default new QueryDomain();
