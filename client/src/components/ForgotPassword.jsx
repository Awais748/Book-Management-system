import React, { useState } from "react";
import { userBaseUrl } from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/send-otp", { Email });
      if (data.success) {
        toast.success("OTP Sent to Email");
        navigate("/verify-otp", { state: { Email } });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-4">
      <Toaster />
      <form
        className="bg-[#111827]/70 p-6 rounded-xl w-full max-w-md border border-gray-700"
        onSubmit={handleSendOTP}
      >
        <h2 className="text-2xl text-green-400 font-bold text-center mb-4">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full mb-4 p-2 bg-[#1f2937] border border-gray-600 text-gray-200 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-green-500 py-2 rounded-lg font-bold">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
