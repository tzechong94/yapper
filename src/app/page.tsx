import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, LogIn, Space } from "lucide-react";
import StartChat from "@/components/StartChat";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chats } from "@/lib/db/schema";
import TypewriterTitle from "@/components/TypewriterTitle";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId, "userid");
  const isAuth = !!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="bg-gradient-to-r min-h-screen from-gray-100 grainy to-teal-100 flex items-center justify-center">
      <div className="text-center px-4 md:px-8">
        <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl">
          Yapper
          <br></br> your{" "}
          <span className="text-cyan-600 font-bold">AI Companion</span>
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-lg md:text-2xl lg:text-3xl text-slate-700 mt-4">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          {isAuth ? (
            firstChat ? (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    See chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <StartChat />
            )
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
          <div className="ml-4 mt-1.5">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
