import wrapper from "../../../helpers/wrapper";
import { InternalServerError } from "../../../helpers/error";
import query from "./query";
import { endOfYear, startOfYear, startOfMonth, endOfMonth } from "date-fns";

class QueryDomain {
  async totalAllData() {
    const { data, err } = await query.countAll();
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }

  async totalNormalStatus() {
    const { data, err } = await query.countByStatus("0");
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }

  async totalNotNormalStatus() {
    const { data, err } = await query.countByStatus("1");
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    return wrapper.data(data);
  }

  async percentageGizi(payload: ReportParams) {
    const date = new Date();
    date.setFullYear(payload.year);
    date.setMonth(payload.month);

    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    const { data, err } = await query.percentageGizi(
      startDate.toISOString(),
      endDate.toISOString()
    );
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    const normal = data[0]?.total || 0;
    const anomaly = data[1]?.total || 0;

    const res = {
      totalData: normal + anomaly,
      totalNormal: normal,
      totalNotNormal: anomaly,
    };

    return wrapper.data(res);
  }

  async percentageGender(payload: ReportParams) {
    const date = new Date();
    date.setFullYear(payload.year);
    date.setMonth(payload.month);

    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    const { data, err } = await query.percentageGender(
      startDate.toISOString(),
      endDate.toISOString()
    );
    if (err) {
      return {
        err: new InternalServerError(err as string),
        data: null,
      };
    }

    const res = {
      totalData: data[0].total + data[1].total,
      totalNormal: data[0].total,
      totalNotNormal: data[1].total,
    };

    return wrapper.data(res);
  }

  async grafikAge(payload: ReportParams) {
    const date = new Date();
    date.setFullYear(payload.year);

    const startDate = startOfYear(date);
    const endDate = endOfYear(date);

    // age < 9
    const { data: data0, err: err0 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 0,
      max: 9,
    });
    if (err0) {
      return {
        err: new InternalServerError(err0 as string),
        data: null,
      };
    }

    // age > 10 & age < 19
    const { data: data1, err: err1 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 10,
      max: 19,
    });
    if (err1) {
      return {
        err: new InternalServerError(err1 as string),
        data: null,
      };
    }

    // age > 20 & age < 29
    const { data: data2, err: err2 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 20,
      max: 29,
    });
    if (err2) {
      return {
        err: new InternalServerError(err2 as string),
        data: null,
      };
    }

    // age > 30 & age < 39
    const { data: data3, err: err3 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 30,
      max: 39,
    });
    if (err3) {
      return {
        err: new InternalServerError(err3 as string),
        data: null,
      };
    }

    // age > 40 & age < 49
    const { data: data4, err: err4 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 40,
      max: 49,
    });
    if (err4) {
      return {
        err: new InternalServerError(err4 as string),
        data: null,
      };
    }

    // age > 40 & age < 49
    const { data: data5, err: err5 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 50,
      max: 59,
    });
    if (err5) {
      return {
        err: new InternalServerError(err5 as string),
        data: null,
      };
    }

    // age > 50
    const { data: data6, err: err6 } = await query.grafikAge({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      min: 50,
      max: 100,
    });
    if (err6) {
      return {
        err: new InternalServerError(err6 as string),
        data: null,
      };
    }

    const data = [
      data0.total,
      data1.total,
      data2.total,
      data3.total,
      data4.total,
      data5.total,
      data6.total,
    ];

    return wrapper.data(data);
  }

  async grafikGizi(payload: ReportParams) {
    const date = new Date();
    date.setFullYear(payload.year);

    const startDate = startOfYear(date);
    const endDate = endOfYear(date);

    const { data: status0, err: err0 } = await query.grafikGizi(
      startDate.toISOString(),
      endDate.toISOString(),
      "0"
    );
    if (err0) {
      return {
        err: new InternalServerError(err0 as string),
        data: null,
      };
    }

    const { data: status1, err: err1 } = await query.grafikGizi(
      startDate.toISOString(),
      endDate.toISOString(),
      "1"
    );
    if (err1) {
      return {
        err: new InternalServerError(err1 as string),
        data: null,
      };
    }

    const resStatus0 = new Array(12).fill(0);
    for (let i = 0; i < status0.length; i++) {
      const el = status0[i];
      resStatus0[i] = el.total;
    }

    const resStatus1 = new Array(12).fill(0);
    for (let i = 0; i < status1.length; i++) {
      const el = status1[i];
      resStatus1[i] = el.total;
    }

    return wrapper.data({ resStatus0, resStatus1 });
  }
}

export default new QueryDomain();
