import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

function EditTodo() {
  const [title, setTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    axios
      .get(`/getOneTodo/${id}`)
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setTodoDesc(data.description);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
      });
  }, [id]);

  async function handleSubmit(ev) {
    try {
      ev.preventDefault();

      const updatedTodo = { title, todoDesc, id };
      const { data } = await axios.put("/updateTodos/" + id, updatedTodo);

      setTitle("");
      setTodoDesc("");

      // If the update is successful, navigate to '/'
    } catch (error) {
      console.error("Error updating todo:", error);
      // Handle error if needed
    }
  }

  return (
    <div className="flex min-h-screen mt-72 justify-center">
      <div className="flex flex-col gap-4 h-24 w-2/4 px-3 py-3 border-none">
        <h1 className=" text-black text-2xl">Edit The Task</h1>
        <div className="border-slate-950 border rounded-lg">
          <label htmlFor="title" className="sr-only">
            Enter the Title of Task
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-4 text-lg border-none text-black placeholder-[black] rounded-lg cursor-pointer"
            placeholder="Enter the Title of Task!!"
          />
        </div>
        <div className="border-slate-950 border rounded-lg">
          <label htmlFor="description" className="sr-only">
            Description of the Task
          </label>
          <input
            id="description"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
            className="w-full px-3 py-4 text-lg border-none text-black placeholder-[black] rounded-lg cursor-pointer"
            placeholder="Description of the Task!!!"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 bg-[#2a8b89] rounded-lg flex justify-center text-black cursor-pointer"
          >
            <span className="flex gap-3 text-4xl items-center text-center text-black">
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
  );
}

export default EditTodo;
