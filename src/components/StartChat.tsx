"use client";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Tesseract from "tesseract.js";
import { Button } from "./ui/button";

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/create-chat", {
        
      });
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
    <div className="p-2 rounded-xl">
      <div>
        <Button onClick={handleClick}>Start chatting</Button>
      </div>
    </div>
  );
};

export default FileUpload;
