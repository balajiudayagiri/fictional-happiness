"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IconTrash } from "@tabler/icons-react";

export default function SettingsPage() {
  const [groqApiKey, setGroqApiKey] = useState<string | null>("");
  const [modalToUse, setModalToUse] = useState<string | null>("");
  const [chatHistory, setChatHistory] = useState<string | null>("");

  const [isGroqApiKeyPresent, setIsGroqApiKeyPresent] =
    useState<boolean>(false);
  const [isModalToUsePresent, setIsModalToUsePresent] =
    useState<boolean>(false);
  const [isChatHistoryPresent, setIsChatHistoryPresent] =
    useState<boolean>(false);

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    // Load stored values from localStorage (if available)
    const storedGroqApiKey = localStorage.getItem("GROQ_API_KEY");
    const storedModalToUse = localStorage.getItem("MODAL_TO_USE");
    const storedChatHistory = localStorage.getItem("chatHistory");

    if (storedGroqApiKey) {
      setGroqApiKey(storedGroqApiKey);
      setIsGroqApiKeyPresent(true);
    }
    if (storedModalToUse) {
      setModalToUse(storedModalToUse);
      setIsModalToUsePresent(true);
    }
    if (storedChatHistory) {
      setChatHistory(storedChatHistory);
      setIsChatHistoryPresent(true);
    }
  }, []);

  const clearGroqApiKey = () => {
    localStorage.removeItem("GROQ_API_KEY");
    setGroqApiKey(null);
    setIsGroqApiKeyPresent(false);
  };

  const clearModalToUse = () => {
    localStorage.removeItem("MODAL_TO_USE");
    setModalToUse(null);
    setIsModalToUsePresent(false);
  };

  const clearChatHistory = () => {
    localStorage.removeItem("chatHistory");
    setChatHistory(null);
    setIsChatHistoryPresent(false);
  };

  const toggleExpansion = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className="w-full bg-background shadow-lg rounded-lg p-8 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Settings</h1>

      <div className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Manage Local Storage Keys</h2>

          {/* Display GROQ_API_KEY */}
          <div className="space-y-4 border border-gray-200/50 bg-gray-300/20 p-4 rounded-md my-4">
            <h3 className="text-md font-semibold">GROQ_API_KEY</h3>
            {isGroqApiKeyPresent ? (
              <div>
                <p className="text-sm">The current GROQ API Key value is:</p>
                <details>
                  <summary
                    className="bg-slate-200/20 py-2 px-4 rounded-md mt-2 cursor-pointer"
                    onClick={() => toggleExpansion("groqApiKey")}>
                    GROQ API KEY
                  </summary>
                  <div
                    className={clsx(
                      "transition-all duration-300 ease-in-out",
                      expandedItem === "groqApiKey"
                        ? "max-h-[1000px]"
                        : "max-h-0",
                      "overflow-hidden"
                    )}>
                    <pre className="bg-gray-100/10 rounded-md p-2 mt-2 text-sm">
                      {groqApiKey}
                    </pre>
                  </div>
                </details>
                <button
                  type="button"
                  onClick={clearGroqApiKey}
                  className="w-fit bg-red-600 flex gap-2 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2">
                  <IconTrash /> Clear GROQ_API_KEY
                </button>
              </div>
            ) : (
              <p className="text-sm ">
                GROQ_API_KEY not found in localStorage.
              </p>
            )}
          </div>

          {/* Display MODAL_TO_USE */}
          <div className="space-y-4 border border-gray-200/50 bg-gray-300/20 p-4 rounded-md my-4">
            <h3 className="text-md font-semibold ">MODAL_TO_USE</h3>
            {isModalToUsePresent ? (
              <div>
                <p className="text-sm ">The current modal to use is:</p>
                <details>
                  <summary
                    className="bg-slate-200/20 py-2 px-4 rounded-md mt-2 cursor-pointer"
                    onClick={() => toggleExpansion("modalToUse")}>
                    MODAL TO USE
                  </summary>
                  <div
                    className={clsx(
                      "transition-all duration-300 ease-in-out",
                      expandedItem === "modalToUse"
                        ? "max-h-[1000px]"
                        : "max-h-0",
                      "overflow-hidden"
                    )}>
                    <pre className="bg-gray-100/10 rounded-md p-2 mt-2 text-sm ">
                      {modalToUse}
                    </pre>
                  </div>
                </details>
                <button
                  type="button"
                  onClick={clearModalToUse}
                  className="w-fit bg-red-600 flex gap-2 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2">
                  <IconTrash /> Clear MODAL_TO_USE
                </button>
              </div>
            ) : (
              <p className="text-sm ">
                MODAL_TO_USE not found in localStorage.
              </p>
            )}
          </div>

          {/* Display chatHistory */}
          <div className="space-y-4 border border-gray-200/50 bg-gray-300/20 p-4 rounded-md my-4">
            <h3 className="text-md font-semibold ">chatHistory</h3>
            {isChatHistoryPresent ? (
              <div>
                <p className="text-sm ">The current chat history is:</p>
                <button
                  type="button"
                  onClick={clearChatHistory}
                  className="w-fit bg-red-600 flex gap-2 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2">
                  <IconTrash /> Clear chatHistory
                </button>

                <details>
                  <summary
                    className="bg-slate-200/20 py-2 px-4 rounded-md mt-2 cursor-pointer"
                    onClick={() => toggleExpansion("chatHistory")}>
                    Chat History
                  </summary>
                  <div
                    className={clsx(
                      "transition-all duration-300 ease-in-out",
                      expandedItem === "chatHistory"
                        ? "max-h-[1000px]"
                        : "max-h-0",
                      "overflow-hidden"
                    )}>
                    <pre
                      className={clsx(
                        "bg-gray-100/10 rounded-md p-2 mt-2 text-sm h-96 overflow-y-scroll",
                        "sm:[&::-webkit-scrollbar]:w-1",
                        " sm:[&::-webkit-scrollbar-track]:bg-gray-100/10 sm:[&::-webkit-scrollbar-track]:rounded-xl",
                        " sm:[&::-webkit-scrollbar-thumb]:bg-gray-300/20 sm:[&::-webkit-scrollbar-thumb]:rounded-xl"
                      )}>
                      <code className="whitespace-pre-wrap">{chatHistory}</code>
                    </pre>
                  </div>
                </details>
              </div>
            ) : (
              <p className="text-sm ">chatHistory not found in localStorage.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
