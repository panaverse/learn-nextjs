import { create } from "zustand";

export type Todo = {
  id: string;
  title: string;
  status: string;
};

type TodoStore = {
  todos: Todo[];
  getAlltodos: () => Promise<void>;
  addTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (todo:Todo) => Promise<void>;
};
const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

export const todoStore = create<TodoStore>((set) => ({
  todos: [],
  getAlltodos: async () => {
    const response = await fetch(`${URL}/todos`, { method: "GET" });
    const {message,todos} = await response.json();
    if (message === "success") {
      set({ todos });
    }
  },
  addTodo: async (newTodo: Todo) => {
    const response = await fetch(`${URL}/todo`, {
      method: "POST",
      body: JSON.stringify({ todo: newTodo }),
      headers: { "Content-Type": "application/json" },
    });
    const { message, todo } = await response.json();
    if (message === "success") {
      console.log(todo, "todo in store");
      set((state) => ({ todos: [...state.todos, todo] }));
    }
  },
  deleteTodo: async (id: string) => {
    const response = await fetch(`${URL}/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const { message } = await response.json();
    if (message === "success") {
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    }
  },
  updateTodo: async (todo:Todo) => {
    const response = await fetch(`${URL}/todo/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ todo: todo }),
      headers: { "Content-Type": "application/json" },
    });
    const { message } = await response.json();
    if (message === "success") {
      set((state) => ({ todos: state.todos.map((todo) => todo.id === todo.id ? todo : todo) }));
    }
  },
}));
