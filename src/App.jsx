import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./assets/navbar/Navbar";
import Login from "./assets/loginpage/Login";
import Signup from "./assets/SignUp/Signup";
import { UserContextProvider } from "./UserContext.jsx"; // Check if the path is accurate
import Task from "./todoInput/Task";
import axios from "axios";
import EditTodo from "./EditTodo.jsx";

axios.defaults.baseURL='https://taskmanager-swfb.onrender.com';
axios.defaults.withCredentials =true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/todos" element={<Task/>}/>
            <Route path="/:id" element={<EditTodo/>}/>
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
