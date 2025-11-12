import dotenv from "dotenv";
import user from "../Models/user.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { customAlphabet } from "nanoid";
dotenv.config();
const PRIVATE_KEY = process.env.SECRET_KEY;

export const handleSignupUserController = async (req, res) => {
  const body = req.body;
  try {
    if (
      !body?.FirstName ||
      !body?.LastName ||
      !body?.Email ||
      !body?.Password
    ) {
      return res
        .status(500)
        .json({ message: "All fields are required ", status: false });
    }
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltCount);
    console.log("HashedPassword", hashedPassword);

    const signup = await user.create({ ...body, Password: hashedPassword });
    if (signup) {
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        id: signup?.id,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const handleSigninUserController = async (req, res) => {
  const body = req.body;
  try {
    if (!body.Email || !body.Password) {
      return res
        .status(500)
        .json({ message: "Email and password are required", success: false });
    }

    const existingUser = await user.findOne({ Email: body.Email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesn't exist", success: false });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.Password,
      existingUser.Password
    );
    console.log("isPasswordMatched", isPasswordMatched);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Password doesn't matched", success: false });
    }

    const token = jwt.sign(
      { email: existingUser?.Email, id: existingUser?._id },
      PRIVATE_KEY
    );

    return res.status(200).json({
      message: "User loged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}; // -------------------- SEND OTP --------------------
export const sendOTPController = async (req, res) => {
  const { Email } = req.body;
  try {
    const existingUser = await user.findOne({ Email });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    // Generate 6-digit OTP using nanoid
    const generateOTP = customAlphabet("1234567890", 6);
    const otp = generateOTP();

    existingUser.otp = otp;
    existingUser.isVerified = false;
    await existingUser.save();

    const message = `<h2>Your OTP is: ${otp}</h2><p>Do not share with anyone.</p>`;
    await sendEmail({
      to: Email,
      subject: "Password Reset OTP",
      html: message,
    });

    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.log("sendOTP error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send OTP", success: false });
  }
};

// -------------------- VERIFY OTP --------------------
export const verifyOTPController = async (req, res) => {
  const { Email, otp } = req.body;
  try {
    const existingUser = await user.findOne({ Email });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    if (existingUser.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP", success: false });

    existingUser.isVerified = true;
    existingUser.otp = null;
    await existingUser.save();

    return res
      .status(200)
      .json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    console.log("verifyOTP error:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// -------------------- RESET PASSWORD --------------------
export const resetPasswordController = async (req, res) => {
  const { Email, newPassword } = req.body;
  try {
    const existingUser = await user.findOne({ Email });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    if (!existingUser.isVerified)
      return res
        .status(400)
        .json({ message: "OTP not verified", success: false });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.Password = hashedPassword;
    existingUser.isVerified = false;
    await existingUser.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.log("resetPassword error:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
