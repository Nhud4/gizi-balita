export class HttpError extends Error {
  code: number;
  data: any;
  status?: number;

  constructor(
    message: string,
    code: number,
    name: string,
    data: any = null,
    status?: number
  ) {
    super(message);
    this.name = name;
    this.code = code;
    this.data = data;
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 400, "BadRequestError", data);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 401, "UnauthorizedError", data);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 403, "ForbiddenError", data);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 404, "NotFoundError", data, 1);
  }
}

export class DataNotFoundError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 404, "DataNotFoundError", data, 0);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 422, "UnprocessableEntityError", data);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, data?: any) {
    super(message, 500, "InternalServerError", data);
  }
}
