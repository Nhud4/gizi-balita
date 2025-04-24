import express from "express";
import Wrapper from "../helpers/wrapper";
import { NotFoundError } from "../helpers/error";
import Logger from "../helpers/logger";
import auth from "../models/auth/routes";

const router = express.Router();

router.use("/api", auth);

router.get("/", (req, res, next) => {
  Wrapper.response(res, 200, {
    message: "backend services is running properly",
    code: 200,
    data: null,
    success: true,
  });
});

router.use((req, res, next) => {
  return Wrapper.responseError(
    res,
    new NotFoundError("resource not found from backend services")
  );
});

router.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Logger.error("exception", error);
    return Wrapper.responseError(res, error);
  }
);

export default router;
