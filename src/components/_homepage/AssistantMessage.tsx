"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import clsx from "clsx";
import {
  IconAi,
  IconCheck,
  IconClipboard,
  IconRobot,
} from "@tabler/icons-react";
import "./styles.css"; // Ensure this is correctly linked
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return !inline && match ? (
    <div className="relative">
      <button onClick={handleCopy} className="copy-button">
        {copied ? "Copied!" : <IconClipboard size={14} />}
      </button>
      <SyntaxHighlighter
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={vscDarkPlus as unknown as any} // Ensuring correct style type
        language={match[1]}
        PreTag="div"
        {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={clsx("rounded-xl", className)} {...props}>
      {children}
    </code>
  );
};

interface AssistantMessageProps {
  content: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ content }) => {
  const [reponseCopied, setReponseCopied] = useState(false);

  const handleReponseCopied = () => {
    navigator.clipboard.writeText(String(content)).then(() => {
      setReponseCopied(true);
      setTimeout(() => setReponseCopied(false), 2000);
    });
  };
  return (
    <div
      className={clsx(
        montserrat.className,
        "assistant-message-root w-max max-md:w-full"
      )}>
      <fieldset className="assistant-message md:px-3 w-full">
        <legend className="ml-6 bg-[#2c2c2c] border border-solid border-gray-300/50 rounded-full px-2 flex items-center space-x-1">
          <IconRobot size={16} />
          <IconAi />
        </legend>
        <div className="assistant-message-container">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlock as unknown as React.FC<CodeProps>,
            }}>
            {content}
          </ReactMarkdown>
        </div>
      </fieldset>
      <div className="mx-4">
        <span onClick={handleReponseCopied} className="cursor-pointer">
          {reponseCopied ? (
            <IconCheck size={14} />
          ) : (
            <IconClipboard size={14} />
          )}
        </span>
      </div>
    </div>
  );
};

export default AssistantMessage;
