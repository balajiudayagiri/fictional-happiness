"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const sections = [
  {
    id: "how-to-use",
    title: "How to Use the App",
    content: (
      <>
        <p className="text-lg text-gray-300">
          This app leverages AI to help you solve a variety of problems and
          create personalized AI-driven solutions. Whether you need help with
          content creation, data analysis, task automation, or even generating
          creative ideas, the AI can assist you in producing tailored outcomes.
          Let’s explore how you can get started with the app and make the most
          of its features.
        </p>
        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          1. Getting Started with the App
        </h3>
        <p className="text-lg text-gray-300">
          Simply open the app, and you&apos;ll be directed to the main
          dashboard. You don’t need to create an account—just access the
          features directly. From there, you can start interacting with the AI
          to help you complete tasks.
        </p>
        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          2. Creating Custom AI Solutions
        </h3>
        <p className="text-lg text-gray-300">
          The app’s core feature is its ability to generate AI-driven solutions
          tailored to your specific needs. You can input a description of what
          you need, and the AI will create the solution for you. Here are a few
          examples of what you can do:
        </p>
        <ul className="list-disc list-inside mt-4 text-lg text-gray-300">
          <li>
            Generate written content, such as articles, blog posts, or reports.
          </li>
          <li>
            Generate code snippets for development tasks or automate coding
            processes.
          </li>
          <li>Solve problems by providing actionable steps or solutions.</li>
          <li>
            Analyze data and provide insights based on patterns and trends.
          </li>
          <li>
            Automate repetitive tasks like scheduling, reminders, or generating
            emails.
          </li>
        </ul>
        <p className="mt-6 text-lg text-gray-300">
          Whether you need to create creative content, analyze data, or automate
          mundane tasks, the AI can assist you with multiple types of solutions
          based on your needs.
        </p>
        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          3. Customizing Your AI Experience
        </h3>
        <p className="text-lg text-gray-300">
          The app allows you to customize the AI experience based on the task
          you want to accomplish. Whether you&apos;re seeking creative
          solutions, automating tasks, or getting insights, the AI can adapt its
          responses based on the context. You can provide more details for each
          task to help the AI better understand what you need.
        </p>
        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          4. Getting Insights and Recommendations
        </h3>
        <p className="text-lg text-gray-300">
          As you interact with the app, the AI will learn from your tasks and
          provide personalized insights to help you optimize your process. These
          insights could include:
        </p>
        <ul className="list-disc list-inside mt-4 text-lg text-gray-300">
          <li>Suggestions on how to improve your content creation process.</li>
          <li>
            Identifying patterns in your data and offering actionable
            recommendations.
          </li>
          <li>
            Automating more aspects of your workflow for better efficiency.
          </li>
          <li>
            Predicting potential issues and suggesting ways to mitigate them.
          </li>
        </ul>
        <p className="mt-6 text-lg text-gray-300">
          With every task, the AI improves its understanding of your
          preferences, making your experience smarter and more efficient.
        </p>
      </>
    ),
  },
  {
    id: "about-the-app",
    title: "About the App",
    content: (
      <>
        <p className="text-lg text-gray-300">
          This app is designed to help you integrate with our AI-powered
          service, providing a range of solutions to simplify your tasks.
          Whether you&apos;re generating content, automating processes, or
          analyzing data, the app can create tailored AI solutions that fit your
          needs. We aim to streamline your workflow, save you time, and boost
          your productivity.
        </p>
        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          Key Features:
        </h3>
        <ul className="list-disc list-inside mt-4 text-lg text-gray-300">
          <li>
            Generate a wide range of AI-driven solutions tailored to your needs
          </li>
          <li>
            Customizable AI experience based on the type of task you&apos;re
            working on
          </li>
          <li>Automate repetitive tasks, schedule events, and set reminders</li>
          <li>Seamless integration with your existing tools and platforms</li>
          <li>
            Real-time insights and recommendations based on your past
            interactions
          </li>
        </ul>
        <p className="mt-6 text-lg text-gray-300">
          The app helps you unlock the full potential of AI to optimize your
          daily tasks, whether you&apos;re working on creative projects, data
          analysis, or automating workflows. With the AI continuously learning
          from your actions, it becomes increasingly accurate and efficient at
          assisting you in completing tasks faster and smarter.
        </p>
      </>
    ),
  },
  {
    id: "get-keys",
    title: "How to Get API Keys",
    content: (
      <>
        <h3 className="text-2xl font-semibold text-gray-100">
          Getting Your API Key
        </h3>
        <p className="text-lg text-gray-300">
          To get your personal API key, you’ll need to visit the official
          website and sign in to your account. From there, navigate to the
          <a
            href="https://console.groq.com/playground"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-600">
            &quot;API Settings&quot;
          </a>{" "}
          section. Here’s how to generate your API key:
        </p>
        <ol className="list-decimal list-inside mt-4 text-lg text-gray-300">
          <li>
            Log in to your account on{" "}
            <a
              href="https://console.groq.com/"
              className="text-indigo-400 hover:text-indigo-600">
              GroqCloud
            </a>
            .
          </li>
          <li>
            Go to the <strong>&quot;API Settings&quot;</strong> page in the
            menu.
          </li>
          <li>
            Click the <strong>&quot;Generate New API Key&quot;</strong> button.
          </li>
          <li>Copy the generated key and keep it safe.</li>
        </ol>
        <p className="mt-6 text-lg text-gray-300">
          Your API key will allow you to access the app&apos;s functionality
          programmatically. Ensure you store this key securely, as it is crucial
          for making API requests. For more details on how to integrate the API,
          please refer to the{" "}
          <a
            href="https://console.groq.com/docs/overview"
            className="text-indigo-400 hover:text-indigo-600"
            target="_blank">
            GroqCloud API Documentation
          </a>
          .
        </p>

        <h3 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
          How to Set Your Modal
        </h3>
        <p className="text-lg text-gray-300">
          The modal setting controls the behavior of the app. To set it up,
          follow these steps:
        </p>
        <ol className="list-decimal list-inside mt-4 text-lg text-gray-300">
          <li>
            Navigate to the <strong>&quot;Settings&quot;</strong> page of the
            app.
          </li>
          <li>
            Select your preferred modal from the list of available options.
          </li>
          <li>
            Click <strong>&quot;Save&quot;</strong> to apply the changes.
          </li>
        </ol>
        <p className="mt-6 text-lg text-gray-300">
          The modal setting allows you to customize the way the app interacts
          with your tasks and provides additional features like notifications,
          task automation, and visual interfaces. If you&apos;re looking for
          more customization options, visit the{" "}
          <a
            href="https://console.groq.com/settings"
            target="_blank"
            className="text-indigo-400 hover:text-indigo-600">
            GroqCloud Settings
          </a>{" "}
          page for further configuration.
        </p>
      </>
    ),
  },
];

const HelpCenter = () => {
  const searchParams = useSearchParams();

  // Get the section parameter from the URL query string (e.g., ?section=how-to-use)
  const sectionToScrollTo = searchParams.get("section");

  // Scroll to the section when the component mounts or when the query parameter changes
  useEffect(() => {
    if (sectionToScrollTo) {
      const element = document.getElementById(sectionToScrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [sectionToScrollTo]);

  return (
    <div className="help-center-container  max-w-7xl mx-auto p-8">
      <div className="flex gap-16">
        {/* Left side - Main Content */}
        <div className="flex-1 space-y-12">
          {sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="border-b pb-10 last:border-none">
              <h2 className="text-6xl font-semibold text-gray-100 tracking-tight">
                {section.title}
              </h2>
              <div className="mt-6 text-md text-gray-400">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Right side - Navigation */}
        <div className="w-64 sticky h-fit top-10 hidden lg:block">
          <h3 className="text-2xl font-semibold text-gray-100 mb-6">
            In this article
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`?section=${section.id}`}
                  className="block py-2 px-3 rounded-lg transition-all hover:bg-gray-800">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
