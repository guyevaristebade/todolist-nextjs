import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  const { title, description, priority } = await req.json();

  if (!title || !description || !priority) {
    return NextResponse.json(
      { error: "Title, description, and priority are required." },
      { status: 400 }
    );
  }

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      priority,
    },
  });

  return NextResponse.json(task);
}

// update completed
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  const { completed } = await req.json();

  if (completed === undefined) {
    return NextResponse.json(
      { error: "Completed is required." },
      { status: 400 }
    );
  }

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  const task = await prisma.task.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(task);
}
