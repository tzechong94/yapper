import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatSideBar from "@/components/ChatSideBar";
import React from "react";
import { eq } from "drizzle-orm";
import axios from "axios";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen">
      <div className="flex-shrink-0 min-w-[100px] max-w-[300px] w-1/5">
        <ChatSideBar chats={_chats} chatId={null} />
      </div>
      <div className="flex-grow border-l-4 border-l-slate-200">{children}</div>
    </div>
  );
}
