import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import { sidebarItems } from "@/constants/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Jira Ticket Creator",
  description:
    "Generate Jira tickets effortlessly with AI. Describe your issue and let AI create the perfect ticket for you.",
  openGraph: {
    title: "AI Jira Ticket Creator",
    description: "Generate Jira tickets effortlessly with AI.",
    url: "https://yourwebsite.com",
    siteName: "AI Jira Ticket Creator",
    images: [
      {
        url: "/path/to/your/image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Jira Ticket Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "AI Jira Ticket Creator",
    description: "Generate Jira tickets effortlessly with AI.",
    images: ["/path/to/your/image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-h-screen overflow-hidden`}>
        <Sidebar items={sidebarItems}>{children}</Sidebar>
        {/* {children} */}
      </body>
    </html>
  );
}
