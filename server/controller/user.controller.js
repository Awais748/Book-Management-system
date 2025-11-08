import dotenv from "dotenv"
import user from "../Models/user.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
};
