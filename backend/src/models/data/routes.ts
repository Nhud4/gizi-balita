import express from "express";
import { verifyToken } from "../../middlewares/auth";
import multer from "multer";
import commandHandler from "./command/handler";
import commandModel from "./command/model";
import queryHandler from "./query/handler";
import queryModel from "./query/model";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/data/list", verifyToken, queryModel.listSchema, queryHandler.list);
router.get(
  "/data/detail/:id",
  verifyToken,
  queryModel.detailSchema,
  queryHandler.detail
);
router.post(
  "/data/upload",
  verifyToken,
  upload.single("file"),
  commandHandler.uploadData
);
router.post(
  "/data/create",
  verifyToken,
  commandModel.createSchema,
  commandHandler.create
);
router.patch(
  "/data/update/:id",
  verifyToken,
  commandModel.updateSchema,
  commandHandler.update
);
router.delete(
  "/data/delete/:id",
  verifyToken,
  commandModel.removeSchema,
  commandHandler.remove
);
router.delete("/data/clear", verifyToken, commandHandler.removeAll);

export default router;
