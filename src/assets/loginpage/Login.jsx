import React, { useContext, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const { data } = await axios.post("/login", userData, {
        withCredentials: true,
      });

      setUser( data);
    } catch (error) {
      console.error("Login failed", error);
    }

    setEmail("");
    setPassword("");
  };

  if (user !== null) {
    navigate("/todos");
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="py-5 px-5 w-[80%] lg:w-[40%] h-auto lg:min-h-[40vh] bg-indigo-900 md:px-2 md:py-5 flex flex-col items-center justify-center gap-5 rounded">
        <div className=" flex flex-col  w-3/4">
          <label className="py-1 text-xl text-gray-200">Email ID</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="px-3 py-2 text-lg rounded outline-none bg-indigo-800 text-gray-200 focus:ring focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col  w-3/4">
          <label className="py-1 text-xl text-gray-200">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="px-3 py-2 text-lg rounded outline-none bg-indigo-800 text-gray-200 focus:ring focus:ring-purple-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-3/4 px-3 py-2 mt-2 text-xl font-semibold   text-center bg-pink-500 rounded text-gray-200 hover:bg-pink-600"
        >
          {" "}
          Log In{" "}
        </button>

        <p className="text-lg text-gray-200">
          Don't have an Account{" "}
          <Link
            to="/Signup"
            className="text-pink-600 underline hover:text-black"
          >
            Register here?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
