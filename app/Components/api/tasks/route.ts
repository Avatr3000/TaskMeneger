import { NextResponse } from "next/server";
// @ts-ignore
import { auth } from "@clerk/clerk-js";
import prisma from "@/app/utils/content";

// Helper function for error responses
function jsonErrorResponse(message: string, status: number) {
    return NextResponse.json({ error: message, status });
}

// POST: Create a new task
export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return jsonErrorResponse("Unauthorized", 401);
        }

        const { title, description, date, completed, status, important, deleteTask } = await req.json();

        if (!title || !description || !date) {
            return jsonErrorResponse("Missing required fields", 400);
        }

        if (title.length < 3) {
            return jsonErrorResponse("Title must be at least 3 characters long", 400);
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed || false,
                isImportant: important || false,
                userId,

                
            },
        });

        return NextResponse.json({ task, status: 201 });
    } catch (error) {
        console.error("ERROR CREATING TASK:", error);
        return jsonErrorResponse("Error creating task", 500);
    }
}

// GET: Retrieve all tasks for the authenticated user
export async function GET(req: Request) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
      }
  
      const tasks = await prisma.task.findMany({
        where: {
          userId,
        },
      });
  
      return NextResponse.json(tasks);
    } catch (error) {
      console.log("ERROR GETTING TASKS: ", error);
      return NextResponse.json({ error: "Error updating task", status: 500 });
    }
  }

// PUT: Update a task (implementation pending)
export async function PUT(req: Request) {
    try {
      const { userId } = auth();
      const { isCompleted, id } = await req.json();
  
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
      }
  
      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          isCompleted,
        },
      });
  
      return NextResponse.json(task);
    } catch (error) {
      console.log("ERROR UPDATING TASK: ", error);
      return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
  }


