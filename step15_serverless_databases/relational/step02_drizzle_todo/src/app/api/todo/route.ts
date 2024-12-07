import { pgTable, serial, text, timestamp, varchar, boolean} from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { InferModel, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'

   const db = drizzle(sql)

 const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(),
    taskname: text('taskname'),
    createdat: timestamp('createdat').defaultNow().notNull(),
    isdone: boolean('isdone').notNull()
  });

   type Task = InferModel<typeof tasks>;
   type NewTask = InferModel<typeof tasks, 'insert'>;

export async function GET(){
    console.log(db);
    const allTasks = await db.select().from(tasks);
    return NextResponse.json(allTasks);
}

export async function POST(request : NextRequest){
    
    const req = await request.json();
    const newTask: NewTask = {
        taskname: req.taskName,
        isdone: req.isDone,
        createdat: new Date()
      };

    console.log(db);
    const insertedUsers = await db.insert(tasks).values(newTask).returning();

    return NextResponse.json(insertedUsers);
}
export async function PUT(request : NextRequest){
    
  const req = await request.json();

  if(req.id){

    const updateResult = await db.update(tasks)
  .set({ isdone: req.isDone})
  .where(eq(tasks.id, req.id))  
  .returning({taskname:tasks.taskname,
              isdone:tasks.isdone
            })

  return NextResponse.json(updateResult);
  }
 
}
