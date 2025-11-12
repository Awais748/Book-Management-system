import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loginForm, SetLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/login", loginForm);
      const authData = {
        isLogin: true,
        token: data?.token,
      };
      if (data?.success) {
        localStorage.setItem("userAuth", JSON.stringify(authData));
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error?.response?.data;
      toast.error(errorMessage?.message || "Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-4">
      <Toaster />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] to-[#1a233a] opacity-90"></div>

      <form
        className="relative bg-[#111827]/70 backdrop-blur-xl border border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6 tracking-wide">
          Welcome Back
        </h2>

        <label className="block text-gray-300 mb-1">Email</label>
        <input
          className="w-full mb-4 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Email"
          type="email"
          name="Email"
          value={loginForm.Email}
          onChange={handleChange}
        />

        <label className="block text-gray-300 mb-1">Password</label>
        <input
          type="password"
          className="w-full mb-6 bg-[#1f2937] text-gray-200 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Password"
          name="Password"
          value={loginForm.Password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?
          <NavLink to="/signup" className="text-green-400 hover:underline ml-1">
            Sign Up
          </NavLink>

        </p>
        <div
          className="text-right text-sm text-green-400 hover:underline cursor-pointer mt-2 flex content-center justify-center"
          onClick={() => navigate("/forgotpassword")}
        >
          Forgot Password?
        </div>
      </form>
    </div>
  );
};

export default Login;
