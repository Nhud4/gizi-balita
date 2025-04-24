import express from "express";
import { basicAuth } from "../../middlewares/auth";
import commandHandler from "./command/handler";
import commandModel from "./command/model";

const router = express.Router();

router.post(
  "/auth/register",
  basicAuth,
  commandModel.createUserSchema,
  commandHandler.createUser
);

export default router;
