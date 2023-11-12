import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { FiInfo, FiLogOut } from "react-icons/fi";

import { UserContext } from "../../UserContext";
import axios from "axios";

const Navbar = () => {
  const [isopen, setIsopen] = useState(false);
  const { user } = useContext(UserContext);

  const CheckToggle = () => {
    setIsopen(!isopen);
  };

  async function logout() {
    try {
      const response = await axios.post("/logout");
    } catch (error) {
      if (error) throw error;
    }
  }

  // console.log(user);
  return (
    <div className="w-full h-[5rem] py-2 px-2 bg-gradient-to-r  from-black to-pink-400    ">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl text-center p-2">Checklistify ✅</h1>
        <button
          className="w-12 h-12 rounded-full hover:bg-pink-600 flex items-center justify-center"
          onClick={CheckToggle}
        >
          {isopen ? (
            <AiOutlineClose size={32} color="white" />
          ) : (
            <FiAlignJustify size={32} color="white" />
          )}
        </button>
      </div>

      <nav
        className={`flex z-0 mt-8 justify-end ${isopen ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col w-44 pl-5  rounded-lg bg-[#e740a7]">
          <li className="py-2 mt-5    ">
            <Link
              to="/"
              className="flex items-center  gap-2   text-white hover:text-red-700"
            >
              <AiOutlineHome size={24} color="white" /> <span>Home</span>
            </Link>
          </li>

          <li className="py-2 mt-5 ">
            <Link
              to="/about"
              className="flex items-center  gap-2  text-white hover:text-red-700"
            >
              <FiInfo size={24} color="white" /> <span>About</span>
            </Link>
          </li>
          {user ? (
            <li className="py-2 mt-5  gap-2 flex items-center text-white">
              <FiUser size={24} color="white" />
              <span className="ml-2">{user.username}</span>
            </li>
          ) : null}
          {user ? (
            <li className="py-2 mt-5  mb-5">
              <button
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer text-white bg-transparent hover:text-red-700"
              >
                <FiLogOut size={24} color="white" /> <span>Logout</span>
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
