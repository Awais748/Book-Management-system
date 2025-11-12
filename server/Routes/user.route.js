import express from "express";
import {
  handleSigninUserController,
  handleSignupUserController,
  resetPasswordController,
  sendOTPController,
  verifyOTPController,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/create", handleSignupUserController);
router.post("/login", handleSigninUserController);
router.post("/send-otp", sendOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/reset-password", resetPasswordController);
export default router;
