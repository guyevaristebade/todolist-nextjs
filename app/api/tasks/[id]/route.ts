import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  console.log("ID => ", id);

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required " },
      { status: 400 }
    );
  }

  const { title, description, priority } = await request.json();
  if (!title || !description || !priority) {
    return NextResponse.json(
      { message: "Title, description, and priority are required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.update({
    where: { id },
    data: { title, description, priority },
  });

  // failed to update
  if (!task) {
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }

  return NextResponse.json(task);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required " },
      { status: 400 }
    );
  }

  const task = await prisma.task.delete({
    where: { id },
  });

  // failed to delete
  if (!task) {
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }

  return NextResponse.json(task);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required " },
      { status: 400 }
    );
  }

  const { completed } = await request.json();

  if (completed === undefined) {
    return NextResponse.json(
      { message: "Completed status is required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.update({
    where: { id },
    data: { completed },
  });

  // failed to update
  if (!task) {
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }

  return NextResponse.json(task);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "Task ID is required " },
      { status: 400 }
    );
  }

  const task = await prisma.task.findUnique({
    where: { id },
  });

  // failed to get
  if (!task) {
    return NextResponse.json(
      { message: "Failed to get task" },
      { status: 500 }
    );
  }

  return NextResponse.json(task);
}
