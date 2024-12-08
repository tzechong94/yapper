// /api/create-chat
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    // const body = await req.json();
    const chat_id = await db
      .insert(chats)
      .values({
        pdfName: "test",
        userId,
      })
      .returning({
        insertedId: chats.id,
      });
    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error, "error");
    return NextResponse.json(
      {
        error: "internal server error",
      },
      { status: 500 }
    );
  }
}
