import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
      });
      if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
      }
      return NextResponse.json(todo, { status: 200 });
    } else {
      const todos = await prisma.todo.findMany();
      return NextResponse.json(todos, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to get todos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const todo = await prisma.todo.create({
      data,
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const todo = await prisma.todo.delete({
      where: { id: data.id },
    });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const todo = await prisma.todo.update({
      where: { id: data.id },
      data,
    });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
