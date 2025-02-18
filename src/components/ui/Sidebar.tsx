"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation

export type SidebarItem = {
  icon: JSX.Element;
  label: string;
  link: string; // The link or route associated with the sidebar item
};

export interface SidebarProps {
  items: SidebarItem[]; // Sidebar items as a prop
  children: React.ReactNode; // Main content area passed as children
}

const Sidebar = ({ items, children }: SidebarProps) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const pathname = usePathname(); // Access the current route path

  // Set the active item based on the current route
  const setActive = (link: string, index: number) => {
    if (pathname === link) {
      setActiveItem(index); // Set active if the route matches the link
    }
  };

  return (
    <div className="flex max-md:flex-col h-screen relative">
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "transition-all duration-1000 ease-in-out bg-transparent relative",
          isSidebarExpanded ? "w-1/4" : "w-16"
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        initial={{ width: "4rem" }} // initial collapsed width
        animate={{ width: isSidebarExpanded ? "25%" : "4rem" }} // transition to expanded width
        transition={{ duration: 0.6 }}>
        <ul className="flex  md:flex-col items-start md:p-4 md:space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className={cn(
                "flex items-center md:justify-center space-x-2 cursor-pointer hover:bg-gray-200/20 rounded-md p-2 transition-all duration-300 ease-in-out",
                // If the item is active, add the active styles
                activeItem === index || pathname === item.link
                  ? "bg-gray-200/20"
                  : ""
              )}
              onClick={() => setActive(item.link, index)} // Set active item on click
              whileHover={{
                scale: 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}>
              {item.icon}
              {/* Text appears halfway when expanding */}
              <motion.div
                className={cn(
                  "text-sm transition-opacity",
                  isSidebarExpanded ? "opacity-100" : "opacity-0"
                )}
                style={{
                  transitionDelay: isSidebarExpanded ? "200ms" : "0ms", // Delay to start showing text halfway through expansion
                }}>
                {item.label}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-grow h-full p-6 bg-gray-100 md:rounded-tl-3xl md:rounded-bl-3xl rounded-tl-xl rounded-tr-xl relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
