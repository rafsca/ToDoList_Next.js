import { NextRequest, NextResponse } from "next/server";
import {
  actionCreateTask,
  actionDeleteTask,
  actionGetTasks,
  actionToggleCompleted,
} from "./actions";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title } = await req.json();
    await actionCreateTask(title);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tasks = await actionGetTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    console.log(id);
    await actionDeleteTask(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    await actionToggleCompleted(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
