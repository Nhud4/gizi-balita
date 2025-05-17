import wrapper from "../../../helpers/wrapper";
import { NotFoundError, InternalServerError } from "../../../helpers/error";
import query from "./query";

class QueryDomain {
  async list(params: ListParams) {
    const { data: list, err: listErr } = await query.list(params);
    const { data: count, err: countErr } = await query.count(params);

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

  async totalData() {
    // get last data
    const { data: last, err: lastErr } = await query.getLatsData();
    if (lastErr) {
      return {
        err: new InternalServerError(lastErr as string),
        data: null,
      };
    }

    // total real data
    const { data: total, err: totalErr } = await query.totalData(last.id);
    if (totalErr) {
      return {
        err: new InternalServerError(totalErr as string),
        data: null,
      };
    }

    const dataStatus0 =
      (total as TotalData[])
        .filter((item) => item.status === "0")
        .map((item) => item.total)[0] || 0;
    const dataStatus1 =
      (total as TotalData[])
        .filter((item) => item.status === "1")
        .map((item) => item.total)[0] || 0;

    return wrapper.data({
      normal: dataStatus0,
      anomaly: dataStatus1,
    });
  }

  async totalAllData() {
    // get last data
    const { data: last, err: lastErr } = await query.getLatsData();
    if (lastErr) {
      return {
        err: new InternalServerError(lastErr as string),
        data: null,
      };
    }

    // total real data
    const { data: total, err: totalErr } = await query.totalData(last.id);
    if (totalErr) {
      return {
        err: new InternalServerError(totalErr as string),
        data: null,
      };
    }

    // total synthetic data
    const { data: synthetic, err: syntheticErr } = await query.totalSynthetic();
    if (syntheticErr) {
      return {
        err: new InternalServerError(syntheticErr as string),
        data: null,
      };
    }

    const dataStatus0 =
      (total as TotalData[])
        .filter((item) => item.status === "0")
        .map((item) => item.total)[0] || 0;
    const dataStatus1 =
      (total as TotalData[])
        .filter((item) => item.status === "1")
        .map((item) => item.total)[0] || 0;

    const syntheticStatus0 =
      (synthetic as TotalData[])
        .filter((item) => item.status === "0")
        .map((item) => item.total)[0] || 0;
    const syntheticStatus1 =
      (synthetic as TotalData[])
        .filter((item) => item.status === "1")
        .map((item) => item.total)[0] || 0;

    const normal = dataStatus0 + syntheticStatus0;
    const anomaly = dataStatus1 + syntheticStatus1;

    return wrapper.data({
      normal,
      anomaly,
    });
  }
}

export default new QueryDomain();
