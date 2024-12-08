"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages, setMessages } =
    useChat({
      api: "/api/chat",
      body: {
        chatId,
      },
      initialMessages: data || [],
    });

  React.useEffect(() => {
    if (data && !isLoading) {
      setMessages(data); // Update messages with the fetched data
    }
  }, [data, isLoading, setMessages]);

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit z-10">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto px-2" id="message-container">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
