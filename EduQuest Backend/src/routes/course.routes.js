import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controllers.js";

const router = Router();

router.route("/create-course").post(createCourse);

router.route("/get-course").get(getCourses);

router.route("/get-courseById").get(getCourseById);

router.route("/update-course").put(updateCourse);

router.route("/delete-course").delete(deleteCourse);

export default router;
