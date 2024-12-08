"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Start new chats with different topics")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Chat history saved")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Delete chat whenever you want")
          .pauseFor(1000)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
