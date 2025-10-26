import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center bg-[#0f172a] shadow-lg px-8 py-4 border-b border-[#22c55e]/30">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-[#22c55e] tracking-wide hover:text-[#86efac] transition-colors duration-300 cursor-pointer">
          CURD
        </h1>
      </div>

      <div>
        <ul className="flex gap-8 items-center text-gray-100 font-medium">
          {["Home", "About", "Contact"].map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-[#22c55e] transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#22c55e] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
