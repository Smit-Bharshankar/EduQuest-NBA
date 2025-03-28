import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  deleteLesson,
  updateLesson,
  getLessonById,
  getLessonsByCourse,
  createLesson,
} from "../controllers/lesson.controllers.js";

const router = Router();

router.route("/delte-lesson").delete(deleteLesson);

router.route("/update-lesson").put(updateLesson);

router.route("/get-LessonbyId").get(getLessonById);

router.route("/get-allLesson").get(getLessonsByCourse);

router.route("/create-lesson").post(createLesson);

export default router;
