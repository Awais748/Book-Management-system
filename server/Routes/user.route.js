import express from "express";
import { handleSigninUserController, handleSignupUserController } from "../controller/user.controller.js";
const router = express.Router();

router.post("/create", handleSignupUserController);
router.post("/login", handleSigninUserController);

export default router;