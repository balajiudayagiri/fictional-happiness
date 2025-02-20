"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomApiConfiguration() {
  const [groqApiKey, setGroqApiKey] = useState<string>("");
  const [modalToUse, setModalToUse] = useState<string>("");
  const [isClearButtonDisabled, setIsClearButtonDisabled] =
    useState<boolean>(true); // Track if clear button should be disabled

  useEffect(() => {
    // Load stored values from localStorage (if available)
    const storedGroqApiKey = localStorage.getItem("GROQ_API_KEY");
    const storedModalToUse = localStorage.getItem("MODAL_TO_USE");

    if (storedGroqApiKey) {
      setGroqApiKey(storedGroqApiKey); // Populate the groqApiKey state with stored value
    }
    if (storedModalToUse) {
      setModalToUse(storedModalToUse); // Populate the modalToUse state with stored value
    }

    // Set clear button state based on whether there are keys in localStorage
    setIsClearButtonDisabled(!storedGroqApiKey && !storedModalToUse);
  }, []);

  const handleGroqApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGroqApiKey(value);
    localStorage.setItem("GROQ_API_KEY", value); // Store value in localStorage
  };

  const handleModalToUseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setModalToUse(value);
    localStorage.setItem("MODAL_TO_USE", value); // Store value in localStorage
  };

  // Function to clear localStorage keys and reset state
  const clearLocalStorage = () => {
    localStorage.removeItem("GROQ_API_KEY");
    localStorage.removeItem("MODAL_TO_USE");
    setGroqApiKey(""); // Reset state to empty
    setModalToUse(""); // Reset state to empty
    setIsClearButtonDisabled(true); // Disable the button after clearing
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      {/* Container motion div with fade-in effect */}
      <motion.div
        className="max-w-md w-full shadow-lg rounded-lg p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}>
        <h1 className="text-3xl font-semibold text-center">
          Custom API Configuration
        </h1>

        <form className="space-y-6">
          {/* First input field with slide-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <label htmlFor="groqApiKey" className="block text-sm font-medium">
              GROQ API Key:
            </label>
            <input
              type="text"
              id="groqApiKey"
              value={groqApiKey} // Value is set from state
              onChange={handleGroqApiKeyChange}
              placeholder="Enter your GROQ API Key"
              className="mt-2 w-full px-4 py-2 border border-gray-300 bg-background rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-300"
            />
          </motion.div>

          {/* Second input field with slide-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            <label htmlFor="modalToUse" className="block text-sm font-medium">
              Modal to Use:
            </label>
            <input
              type="text"
              id="modalToUse"
              value={modalToUse} // Value is set from state
              onChange={handleModalToUseChange}
              placeholder="Enter modal to use"
              className="mt-2 w-full px-4 py-2 border border-gray-300 bg-background rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-300"
            />
          </motion.div>

          {/* Submit button with hover animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Save Configuration
            </button>
          </motion.div>

          {/* Clear localStorage button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}>
            <button
              type="button"
              onClick={clearLocalStorage}
              disabled={isClearButtonDisabled} // Disable button if no items in localStorage
              className={`w-full py-2 px-4 rounded-md mt-4 ${
                isClearButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              }`}>
              Clear Stored Keys
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
