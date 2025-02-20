"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export type SidebarItem = {
  icon: JSX.Element;
  label: string;
  link: string;
};

export interface SidebarProps {
  items: SidebarItem[];
  children: React.ReactNode;
}

const Sidebar = ({ items, children }: SidebarProps) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const pathname = usePathname();

  const setActive = (link: string, index: number) => {
    if (pathname === link) {
      setActiveItem(index);
    }
  };

  return (
    <div className="flex max-md:flex-col h-screen relative">
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "transition-all duration-700 ease-in-out bg-transparent relative",
          isSidebarExpanded ? "w-80" : "w-16"
        )}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        initial={{ width: "4.5rem" }}
        animate={{ width: isSidebarExpanded ? "15%" : "4.5rem" }}
        transition={{ duration: 0.6 }}>
        <ul className="flex md:flex-col items-start md:p-4 md:space-y-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              aria-label={item.label}
              className="w-full">
              <motion.li
                className={cn(
                  "flex items-center space-x-2 w-full cursor-pointer hover:bg-gray-200/20 rounded-md p-2 transition-all duration-300 ease-in-out",
                  activeItem === index || pathname === item.link
                    ? "bg-gray-200/20"
                    : ""
                )}
                onClick={() => setActive(item.link, index)}
                // whileHover={{
                //   scale: 1.1,
                // }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}>
                {/* Always show the icon */}
                <motion.div
                  className={cn(
                    "text-xl transition-opacity",
                    isSidebarExpanded ? "opacity-100" : "opacity-100"
                  )}
                  style={{
                    transitionDelay: isSidebarExpanded ? "200ms" : "0ms",
                  }}>
                  {item.icon}
                </motion.div>
                {/* Text appears halfway when expanding */}
                <motion.div
                  className={cn(
                    "text-sm transition-opacity duration-200 text-nowrap",
                    isSidebarExpanded ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    transitionDelay: isSidebarExpanded ? "200ms" : "0ms",
                  }}>
                  {item.label}
                </motion.div>
              </motion.li>
            </Link>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <div
        className={clsx(
          "flex-grow h-full bg-background border border-solid border-gray-200/20 overflow-hidden",
          " md:rounded-tl-2xl md:rounded-bl-2xl rounded-tl-xl max-md:rounded-tr-xl relative z-10",
          "shadow-xl"
        )}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
