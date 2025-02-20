"use client";
import { IconLoader3, IconSend2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory"; // Import the new ChatHistory component
import clsx from "clsx";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [ticketDetails, setTicketDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Retrieve GROQ_API_KEY and MODAL_TO_USE from localStorage
  const groqApiKey =
    localStorage.getItem("GROQ_API_KEY") || process.env.GROQ_API_KEY;
  const modal =
    localStorage.getItem("MODAL_TO_USE") ||
    process.env.NEXT_PUBLIC_MODAL_TO_USE;

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

    // Clear the textarea immediately after submit
    setTicketDetails("");

    try {
      const response = await fetch("/api/generate-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectDescription: ticketDetails,
          conversation: newConversation,
          groqApiKey, // Send user API key if available
          modal, // Send user modal if available
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
      className="w-full max-md:h-[calc(100vh-40px)] h-full flex flex-col"
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
            AInity
          </motion.h2>

          <motion.p
            className="text-center text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            Take control of your AI integration with AInity.
          </motion.p>
        </div>
      )}

      {/* Chat History */}
      <ChatHistory chatHistory={chatHistory} />

      {/* User Input */}
      <motion.fieldset
        className="relative w-full border border-solid border-gray-500 flex items-end rounded-3xl p-2 mr-6 mb-4 md:max-w-7xl md:mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}>
        <legend className="ml-6 bg-background border border-solid border-gray-300/50 rounded-full px-2">
          <p className="text-[10px] text-gray-500">
            current modal in usage{" "}
            <span className="font-semibold text-indigo-400">
              {modal?.toString()}
            </span>
          </p>
        </legend>
        <textarea
          className={clsx(
            "sm:[&::-webkit-scrollbar]:w-1",
            " sm:[&::-webkit-scrollbar-track]:bg-gray-100/10 sm:[&::-webkit-scrollbar-track]:rounded-xl",
            " sm:[&::-webkit-scrollbar-thumb]:bg-gray-300/20 sm:[&::-webkit-scrollbar-thumb]:rounded-xl",
            "w-full bg-transparent h-24 grow p-2 text-md border-none outline-none focus:outline-none resize-none transition-all duration-300 ease-in-out"
          )}
          value={ticketDetails}
          onChange={(e) => setTicketDetails(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevents newline in textarea
              handleSubmit();
            }
          }}
          placeholder="Describe the issue or task..."
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
      </motion.fieldset>
    </motion.div>
  );
}
