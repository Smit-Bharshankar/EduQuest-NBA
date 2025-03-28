import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  enrollInCourse,
  getUserEnrollments,
  updateProgress,
} from "../controllers/enrollment.controllers.js";

const router = Router();

router.route("/enroll-Course").post(enrollInCourse);

router.route("/get-userEnrollments").get(getUserEnrollments);

router.route("/update-progress").post(updateProgress);

export default router;
