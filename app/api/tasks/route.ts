import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title, description, priority } = await request.json();

  if (!title || !description || !priority) {
    return NextResponse.json(
      { error: "Title, description, and priority are required." },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
    },
  });

  return NextResponse.json(task);
}
