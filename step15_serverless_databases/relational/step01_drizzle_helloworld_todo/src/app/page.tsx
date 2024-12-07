import Image from "next/image";
import TodoUI from "./Todo";
import { sql } from "@vercel/postgres";
import { db, todoTable } from "@/lib/drizzle";

export default async function Home() {
  const { rows } = await sql`SELECT * from todo`;

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="text-2xl">Todo App</div>
      <div>
        {rows.map((row) => (
          <div key={row.id} className="flex flex-col">
            <p className="bold font-semibold">Title : {row.title}</p>
            <p className="font-base">Description : {row.description}</p>
          </div>
        ))}
      </div>
      <TodoUI />
    </main>
  );
}
