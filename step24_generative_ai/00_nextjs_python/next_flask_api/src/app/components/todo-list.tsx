"use client";
import React, { useEffect, useState } from "react";
import { Todo, todoStore } from "../store/store";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PenIcon, Trash } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

type Props = {};

export default function TodoList({}: Props) {
  const { todos, getAlltodos, addTodo, deleteTodo, updateTodo } = todoStore();
  const [todo, setTodo] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getAlltodos();
  }, []);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: String(Math.floor(Math.random() * 100 + 1)),
      title: todo,
      status: "pending",
    };
    addTodo(newTodo);
    setTodo("");
    getAlltodos();
  };
  const handleDelete = (id: string) => {
    deleteTodo(id);
    getAlltodos();
  };
  const handleUpdate = (id: string, todotTitle: string, status: string) => {
    setId(id);
    setTodo(todotTitle);
    status === "completed" ? setStatus(true) : setStatus(false);
    setOpenDialog(!openDialog);
  };
  const handleAddUpdate = () => {
    setTodo("");
    const updateTodoList: Todo = {
      id: id,
      title: todo,
      status: status ? "completed" : "pending",
    };
    updateTodo(updateTodoList);
    setTodo("");
    setOpenDialog(false);
    getAlltodos();
  };
  return (
    <div className="w-[60%]">
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent>
          <Input
            className="mt-8"
            type="text"
            placeholder="Enter Todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.currentTarget.value);
            }}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="forStatus"
              checked={status}
              onCheckedChange={() => setStatus(!status)}
            />
            <label
              htmlFor="forStatus"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Completed
            </label>
          </div>
          <Button onClick={handleAddUpdate}>Update</Button>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader className="flex flex-row items-center justify-center gap-3">
          <Input
            className="w-[82%] mt-1"
            type="text"
            placeholder="Enter Todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.currentTarget.value);
            }}
          />
          {todo.length > 0 ? (
            <Button onClick={handleAddTodo}>Add Todo</Button>
          ) : (
            <Button onClick={handleAddTodo} disabled>
              Add Todo
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {todos.length === 0 ? (
            <p className="text-center  italic">No todos</p>
          ) : (
            todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className="flex my-3 items-center justify-between shadow-md border-2 border-[#acacac] py-2 px-4 rounded-md"
              >
                {
                    todo.status === "completed" ? (
                        <p className="line-through text-[16px]">{todo.title}</p>
                    ) : (
                        <p className="text-[16px]">{todo.title}</p>
                    )
                }
                <div>
                  <Button
                    className="mr-1"
                    variant={"ghost"}
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Trash size={20} color="red" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      handleUpdate(todo.id, todo.title, todo.status)
                    }
                  >
                    <PenIcon size={20} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
