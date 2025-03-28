import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/getUser").get(verifyJwt, getCurrentUser);

export default router;
