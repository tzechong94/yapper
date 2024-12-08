import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, LogIn, Space } from "lucide-react";
import StartChat from "@/components/StartChat";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chats } from "@/lib/db/schema";

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
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/Main.jpg')] overflow-y-scroll flex items-center justify-center">
      <div
        className="flex-1 max-w-6xl my-8 p-8 backdrop-filter backdrop-blur-lg bg-white/40 self-center"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-bold mb-6">Yapper</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="max-w-full mt-1 text-lg text-slate-600 mt-4">
            {isAuth
              ? "Chat with an AI. Go to your chats by clicking the button below."
              : "Chat with an AI. Log in now"}
          </p>
          <div className="w-full mt-8 max-w-5">
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
          </div>
        </div>
      </div>
    </div>
  );
}
