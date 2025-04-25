import express from "express";
import { verifyToken } from "../../middlewares/auth";
import multer from "multer";
import commandHandler from "./command/handler";
import queryHandler from "./query/handler";
import queryModel from "./query/model";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/data/upload",
  verifyToken,
  upload.single("file"),
  commandHandler.uploadData
);
router.get("/data/list", verifyToken, queryModel.listSchema, queryHandler.list);
router.get(
  "/data/detail/:id",
  verifyToken,
  queryModel.detailSchema,
  queryHandler.detail
);

export default router;
