import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const VerifyOTP = () => {
  const { state } = useLocation();
  const Email = state?.Email;
  const navigate = useNavigate();

  const [otp, setOTP] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/verify-otp", { Email, otp });
      if (data.success) {
        toast.success("OTP Verified");
        navigate("/reset-password", { state: { Email } });
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
        onSubmit={handleVerify}
      >
        <h2 className="text-2xl text-green-400 font-bold text-center mb-4">
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-4 p-2 bg-[#1f2937] border border-gray-600 text-gray-200 rounded-lg"
          onChange={(e) => setOTP(e.target.value)}
        />

        <button className="w-full bg-green-500 py-2 rounded-lg font-bold">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
