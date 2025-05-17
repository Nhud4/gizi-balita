import express from "express";
import { verifyToken } from "../../middlewares/auth";
import queryHandler from "./query/handler";
import queryModel from "./query/model";

const router = express.Router();

router.get(
  "/synthetic/list",
  verifyToken,
  queryModel.listSchema,
  queryHandler.list
);
router.get("/synthetic/total", verifyToken, queryHandler.total);
router.get("/synthetic/all", verifyToken, queryHandler.totalAll);

export default router;
