// /api/create-chat
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const chatId = params.id;
  console.log("chatId", chatId);
  try {
    // const body = await req.json();
    const chat = await db
      .select()
      .from(chats)
      .where(and(eq(chats.id, parseInt(chatId)), eq(chats.userId, userId)));

    console.log("chatttt", chat);
    if (!chat) {
      return NextResponse.json(
        { error: "Chat not found or unauthorized" },
        { status: 404 }
      );
    }

    await db.delete(chats).where(eq(chats.id, parseInt(chatId)));

    return NextResponse.json({ success: true }, { status: 200 });
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
