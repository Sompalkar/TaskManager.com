import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

import { AiOutlineDelete } from "react-icons/ai";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const Task = () => {
  const [title, setTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todo, setTodo] = useState([]);

  const [checked, setChecked] = useState(false);
  const { user } = useContext(UserContext);

  // console.log(user._id);

  const userId = user._id;

  async function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || todoDesc === "") {
      // If either title or description is empty, return without making the post request
      return;
    }

    try {
      const TodoData = { title, todoDesc, userId };
      const TodoDoc = await axios.post("/todos", TodoData);
    } catch (error) {
      if (error) throw error;
    }

    setTitle("");
    setTodoDesc("");
  }

  useEffect(() => {
    axios.get("/Alltodos").then((response) => {
      setTodo(response.data);
    });
  }, [title]);

  async function deleteTask(id) {
    try {
      const { data } = await axios.delete(`/deleteTask/${id}`);
      // After successful deletion, update the state to reflect the changes
      setTodo((prevTodo) => prevTodo.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // if (todo.length == 0) {
  //   return <div> Add Task Here</div>;
  // }
  return (
    //
    <div className="  w-full min-h-screen px-5 pt-10">
      <div className=" flex  justify-center h-80 ">
        <div className="flex  flex-col gap-4 h-24 w-2/4 px-3 py-3   ">
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-4   text-lg  border text-black placeholder-[black] rounded-lg cursor-pointer"
              placeholder="Enter the Title of Task!!"
            />
          </div>
          <div>
            <input
              value={todoDesc}
              onChange={(e) => setTodoDesc(e.target.value)}
              className="w-full px-3 py-4  text-lg border  text-black placeholder-[black]   cursor-pointer"
              placeholder=" Description of the Task!!!"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className=" w-full py-3 bg-[#2a8b89] rounded-lg flex justify-center text-black cursor-pointer"
            >
              <span className="flex gap-3 text-4xl items-center text-center     text-black">
                {" "}
                save
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-7 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {todo.length === 0 && (
        <div className="flex justify-center items-center min-h-[calc(2/3 * 100vh)] text-black text-4xl">
          Add Task Here
        </div>
      )}

      {/* flex justify-center  items-center flex-col */}
      <div className=" grid gap-8 md:grid-cols-2 ">
        {todo.map((todos) => {
          return (
            <div
              key={todos._id}
              className="  flex flex-col  min-h-[calc(2/3 * 100vh)]   bg-purple-700 gap-2 justify-center mt-2 rounded-lg"
            >
              <div className="flex h-40 px-5  justify-between mt-2">
                <input
                  type="checkbox"
                  className="h-5 px-2 py-1 mt-3 border-2 border-pink-400 w-7"
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />

                <div className="  px-5  h-20 w-3/4 grow">
                  <p className="text-black text-3xl truncate  pb-2">
                    {" "}
                    {todos.title}
                  </p>
                  <p
                    className={`text-xl  py-2  bg-white text-gray-600 h-24 pl-4 rounded-xl ${
                      checked ? "line-through" : null
                    }`}
                  >
                    {todos.description}
                  </p>
                </div>

                <div className=" flex flex-col">
                  <button className="px-7 py-3 ml-8 mb-4 rounded-xl bg-pink-500">
                    <Link to={`/${todos._id}`}>
                      <AiFillEdit color={"white"} size={34} />
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteTask(todos._id)}
                    className="px-7 py-3 ml-8 mb-4 rounded-xl bg-pink-500"
                  >
                    <AiOutlineDelete color={"white"} size={34} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Task;
