import express from "express";
import { verifyToken } from "../../middlewares/auth";
import multer from "multer";
import commandHandler from "./command/handler";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/data/upload",
  verifyToken,
  upload.single("file"),
  commandHandler.uploadData
);

export default router;
