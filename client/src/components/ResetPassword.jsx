import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const { state } = useLocation();
  const Email = state?.Email;
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/reset-password", {
        Email,
        newPassword,
      });

      if (data.success) {
        toast.success("Password Reset Successfully");
        navigate("/login");
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
        onSubmit={handleReset}
      >
        <h2 className="text-2xl text-green-400 font-bold text-center mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full mb-4 p-2 bg-[#1f2937] border border-gray-600 text-gray-200 rounded-lg"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 py-2 rounded-lg font-bold">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
