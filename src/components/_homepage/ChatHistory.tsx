"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AssistantMessage from "./AssistantMessage"; // Import the AssistantMessage component
import clsx from "clsx";
import { IconArrowDown } from "@tabler/icons-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom when chatHistory changes
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      // A small tolerance (e.g., 1px) to determine if we're at the bottom
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="relative grow overflow-hidden">
      <div
        ref={chatContainerRef}
        className={clsx(
          "space-y-4 overflow-y-auto h-full p-2 pt-5",
          "[&::-webkit-scrollbar]:w-1",
          " [&::-webkit-scrollbar-track]:bg-gray-100/10 [&::-webkit-scrollbar-track]:rounded-xl",
          " [&::-webkit-scrollbar-thumb]:bg-gray-300/20 [&::-webkit-scrollbar-thumb]:rounded-xl"
        )}
        onScroll={handleScroll}>
        <div className="md:max-w-7xl md:mx-auto">
          {chatHistory.map((message, index) => (
            <motion.div
              key={index}
              className={clsx(
                message.role === "user" ? "text-right" : "text-left",
                ""
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}>
              {message.role === "assistant" ? (
                <AssistantMessage content={message.content} />
              ) : (
                <div className="inline-block bg-gray-400/40 text-white max-w-[40%] w-fit py-3 px-6 rounded-3xl">
                  {message.content}
                </div>
              )}
              {/* Scroll to bottom button */}
            </motion.div>
          ))}
        </div>
      </div>
      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-foreground text-black p-2 rounded-full shadow-lg">
          <IconArrowDown size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatHistory;
