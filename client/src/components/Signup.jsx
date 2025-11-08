import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../axiosInstance";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/create", signupForm);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error?.response?.data;
      toast.error(errorMessage?.message || "Signup Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-4">
      <Toaster />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] to-[#1a233a] opacity-90"></div>

      <form
        className="relative bg-[#111827]/70 backdrop-blur-xl border border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6 tracking-wide">
          Create Account
        </h2>

        {/* First Name */}
        <label className="block text-gray-300 mb-1">First Name</label>
        <input
          type="text"
          className="w-full mb-4 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter First Name"
          name="FirstName"
          value={signupForm.FirstName}
          onChange={handleChange}
        />

        {/* Last Name */}
        <label className="block text-gray-300 mb-1">Last Name</label>
        <input
          type="text"
          className="w-full mb-4 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Last Name"
          name="LastName"
          value={signupForm.LastName}
          onChange={handleChange}
        />

        {/* Email */}
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          className="w-full mb-4 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Email"
          name="Email"
          value={signupForm.Email}
          onChange={handleChange}
        />

        {/* Password */}
        <label className="block text-gray-300 mb-1">Password</label>
        <input
          type="password"
          className="w-full mb-6 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Password"
          name="Password"
          value={signupForm.Password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?
          <NavLink to="/login" className="text-green-400 hover:underline ml-1">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
