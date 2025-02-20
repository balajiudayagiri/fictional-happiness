import HelpCenter from "@/components/help-center/HelpCenter";
import clsx from "clsx";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={clsx(
          "h-dvh overflow-y-auto relative",
          "sm:[&::-webkit-scrollbar]:w-1",
          " sm:[&::-webkit-scrollbar-track]:bg-gray-100/10 sm:[&::-webkit-scrollbar-track]:rounded-xl",
          " sm:[&::-webkit-scrollbar-thumb]:bg-gray-300/20 sm:[&::-webkit-scrollbar-thumb]:rounded-xl"
        )}>
        <HelpCenter />
      </div>
    </Suspense>
  );
}

export default page;
