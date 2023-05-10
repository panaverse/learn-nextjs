"use client";
import { useState } from "react";
import { db, todoTable } from "./lib/drizzle";

type todo = {
  title: string;
  description: string;
};

const TodoUI = () => {
  const [todo, setTodo] = useState<todo>({
    title: "",
    description: "",
  });

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onClickAdd = async () => {
    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    });
  };

  return (
    <div className="flex flex-col justify-center py-2">
      <input
        className="p-3 mb-5"
        name="title"
        placeholder="Title"
        value={todo.title}
        onChange={onChange}
      />
      <textarea
        className="p-3 mb-5"
        name="description"
        placeholder="Description"
        value={todo.description}
        onChange={onChange}
      />
      <button className="bg-green-700 rounded-full p-3" onClick={onClickAdd}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoUI;
