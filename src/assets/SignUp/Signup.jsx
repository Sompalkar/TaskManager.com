import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import SignImg from "./SignupImg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const sendDataToBackend = async () => {
    try {
      const data = {
        email: email,
        password: password,
        username: username,
      };

      const response = await axios.post("/register", data);

      setRedirect(true);
    } catch (error) {
      console.error("Error sending data:", error);
      setRedirect(false);
    }

    setEmail("");
    setPassword("");
    setUsername("");
  };

  if (redirect) {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-600">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-800 flex flex-col justify-center items-center rounded-lg p-5 gap-5">
        <div className="w-full">
          <p className="py-2 text-gray-200 font-medium">User Name</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Name"
            className="w-full outline-none px-3 py-2 rounded bg-gray-700 text-gray-200"
          />
        </div>
        <div className="w-full">
          <p className="py-2 text-gray-200 font-medium flex items-center">
            Email ID <AiOutlineUser size={22} color="white" />
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full outline-none px-3 py-2 rounded bg-gray-700 text-gray-200"
          />
        </div>

        <div className="w-full">
          <p className="py-2 text-gray-200 font-medium flex items-center">
            Password <RiLockPasswordLine size={22} color={"white"} />
          </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            className="w-full outline-none px-3 py-2 rounded bg-gray-700 text-gray-200"
          />
        </div>
        <div className="w-full">
          <button
            onClick={sendDataToBackend}
            className="flex items-center justify-center w-full px-3 py-2 mt-2 text-xl font-semibold   text-center bg-pink-500 rounded text-gray-200 hover:bg-pink-600"
          >
            {" "}
            Log In{" "}
          </button>

          <p className="text-lg text-gray-200 mt-5">
            Already have an Account{" "}
            <Link
              to="/login"
              className="text-pink-400 underline hover:text-black "
            >
              Login here?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
