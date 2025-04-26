import express from "express";
import { verifyToken } from "../../middlewares/auth";
import queryHandler from "./query/handler";
import queryModel from "./query/model";

const router = express.Router();

router.get("/report/total/all", verifyToken, queryHandler.countAll);
router.get("/report/total/normal", verifyToken, queryHandler.countNormal);
router.get("/report/total/kurang", verifyToken, queryHandler.countNotNormal);
router.get(
  "/report/gizi",
  verifyToken,
  queryModel.giziSchema,
  queryHandler.percentageGizi
);
router.get(
  "/report/gender",
  verifyToken,
  queryModel.genderSchema,
  queryHandler.percentageGender
);
router.get(
  "/report/age",
  verifyToken,
  queryModel.ageSchema,
  queryHandler.grafikAge
);
router.get(
  "/report/status",
  verifyToken,
  queryModel.giziGrafikSchema,
  queryHandler.grafikGizi
);

export default router;
