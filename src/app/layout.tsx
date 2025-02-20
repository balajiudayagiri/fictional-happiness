import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import { sidebarItems } from "@/constants/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cortex AI - Advanced AI Integration Platform",
  description:
    "Cortex AI empowers users to seamlessly integrate and manage their own AI models and API keys. Designed for self-service, Cortex AI lets you bring your own models and API keys to create customized AI solutions effortlessly.",

  openGraph: {
    title: "Cortex AI | Advanced AI, Simplified",
    description:
      "Unlock the potential of your AI models with Cortex AI. Easily integrate your own models and API keys to build and manage custom AI solutions without relying on third-party services.",
    url: "https://cortexai.com",
    siteName: "Cortex AI",
    images: [
      {
        url: "/path/to/your/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Cortex AI - Self-Service AI Integration Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@CortexAI",
    title: "Cortex AI | Advanced AI Platform",
    description:
      "Elevate your AI workflows with Cortex AI. Bring your own models and API keys to create, manage, and enhance custom AI solutions.",
    images: ["/path/to/your/logo.jpg"],
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
