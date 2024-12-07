"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2, MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/create-chat", {});
      return response.data;
    },
    onSuccess: ({ chat_id }) => {
      toast.success("chat created");
      router.push(`/chat/${chat_id}`);
      // console.log(data);
    },
    onError: (error) => {
      toast.error("Error creating chat" + error);
    },
  });

  const handleClick = () => {
    mutate();
  };
  return (
    <>
      <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
        <Button
          onClick={handleClick}
          className="w-full border-dashed border-white border"
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
        {/* Hidden file input */}
        <div className="flex flex-col gap-2 mt-4">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center",
                  {
                    "bg-blue-600 text-white": chat.id === chatId,
                    "hover:text-white": chat.id !== chatId,
                  }
                )}
              >
                <MessageCircle className="mr-2" />
                <p className="text-xs w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
          <Link href="/" className="absolute bottom-4 left-4">
            <Button className="w-full border-solid border-white border">
              <ArrowLeft className="" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;