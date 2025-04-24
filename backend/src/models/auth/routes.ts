import express from "express";
import { basicAuth, verifyToken } from "../../middlewares/auth";
import commandHandler from "./command/handler";
import commandModel from "./command/model";
import queryHandler from "./query/handler";

const router = express.Router();

router.post(
  "/auth/register",
  basicAuth,
  commandModel.createUserSchema,
  commandHandler.createUser
);

router.post(
  "/auth/login",
  basicAuth,
  commandModel.loginSchema,
  commandHandler.login
);

router.get("/auth/profile", verifyToken, queryHandler.getProfile);

export default router;
