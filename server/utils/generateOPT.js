import { customAlphabet } from "nanoid";

export const generateOTP = () => {
  const otpGenerator = customAlphabet("1234567890", 6);
  const otp = otpGenerator();
  return otp;
};
