import React, { useContext, useState } from "react";
import Task from "../todoInput/Task";
import { AiFillEdit } from "react-icons/ai";
import Login from "../assets/loginpage/Login";
import Signup from "../assets/SignUp/Signup";
import { UserContext } from "../UserContext";

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to server:", inputValue);
    // Perform actions to send 'inputValue' to the server
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className=" ">
      <div className="w-full z-1000 min-h-screen flex  flex-col  ">
        {user === null ? (
          <Login />
        ) : (
          // Render something else when user is not null
          <div>
            <Task />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
