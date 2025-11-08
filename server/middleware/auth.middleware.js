import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import user from "../Models/user.Model.js";
dotEnv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid token !", success: false });
    }
    const token = authHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token, SECRET_KEY);

    if (!verifiedToken) {
      return res
        .status(401)
        .json({ message: "Invalid token !", success: false });
    }

    const verifiedUser = await user
      .findOne({ Email: verifiedToken?.email })
      .select("Password");

    if (!verifiedUser) {
      return res
        .status(401)
        .json({ message: "Not a valid user!", success: false });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired", success: false });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Invalid token Authentication failde!",
        success: false,
      });
    }
    return res.status(500).json({ message: error, success: false });
  }
};
export default authMiddleware;
