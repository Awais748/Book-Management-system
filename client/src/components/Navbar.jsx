import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAuth"); 
    navigate("/login"); 
  };

  return (
    <div className="w-full flex justify-between items-center bg-[#0f172a] shadow-lg px-8 py-4 border-b border-[#22c55e]/30">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-[#22c55e] tracking-wide hover:text-[#86efac] transition-colors duration-300 cursor-pointer">
          Book Management
        </h1>
      </div>

      <div>
        <ul className="flex gap-8 items-center text-gray-100 font-medium">
          <li>
            <NavLink to="/" className="hover:text-[#22c55e] transition-all">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:text-[#22c55e] transition-all">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-[#22c55e] transition-all">Contact</NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 font-semibold transition-all"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
