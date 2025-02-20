"use client";
import { IconLoader3, IconSend2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory"; // Import the new ChatHistory component

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
const modal = process.env.NEXT_PUBLIC_MODAL_TO_USE as unknown as string;

export default function Home() {
  const [ticketDetails, setTicketDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    }
  }, []);

  const handleSubmit = async () => {
    if (!ticketDetails) return;

    setIsLoading(true);

    const newConversation: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: ticketDetails },
    ];
    setChatHistory(newConversation);

    try {
      const response = await fetch("/api/generate-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectDescription: ticketDetails,
          conversation: newConversation,
        }),
      });

      if (!response.ok) {
        throw new Error("Error generating the ticket");
      }

      if (!response.body) {
        throw new Error("Empty response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let result = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true });
      }

      const updatedConversation: ChatMessage[] = [
        ...newConversation,
        { role: "assistant", content: result },
      ];
      setChatHistory(updatedConversation);

      localStorage.setItem("chatHistory", JSON.stringify(updatedConversation));
    } catch (error) {
      console.error("Error generating Jira ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full h-full pl-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      {chatHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.h2
            className="text-4xl font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            Create a Jira Ticket Using AI
          </motion.h2>

          <motion.p
            className="text-center text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            Describe the issue, and let AI handle the ticket creation.
          </motion.p>
        </div>
      )}

      {/* Chat History */}
      <ChatHistory chatHistory={chatHistory} />

      {/* User Input */}
      <motion.div
        className="relative w-full border border-solid border-gray-500 flex items-end rounded-3xl p-2 mr-6 md:max-w-7xl md:mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}>
        <textarea
          value={ticketDetails}
          onChange={(e) => setTicketDetails(e.target.value)}
          placeholder="Describe the issue or task..."
          className="w-full bg-transparent h-24 grow p-2 text-md border-none outline-none  focus:outline-none  resize-none transition-all duration-300 ease-in-out"
        />
        {/* Create Ticket Button */}
        <button
          onClick={handleSubmit}
          className={`p-2 mt-3 bg-foreground text-background font-semibold rounded-full transition-all duration-300 ${
            isLoading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
          disabled={isLoading || !ticketDetails}>
          {isLoading ? (
            <IconLoader3 size={20} className="animate-spin" />
          ) : (
            <IconSend2 size={20} />
          )}
        </button>
      </motion.div>

      {/* Powered by AI */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Powered by <span className="font-semibold text-indigo-400">AI</span>{" "}
          current modal in usage{" "}
          <span className="font-semibold text-indigo-400">
            {modal?.toString()}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
