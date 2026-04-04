"use client";

import { memo, useState } from "react";
import Intro from "./Intro/Intro";
import Features from "./Intro/Features";
import CommentContainer from "./Intro/Comment/CommentContainer";

type Props = {
  description: string;
  id: string;
  features: any;
  userID: string;
  comments: any;
};

function ContainerFeCoINComponent({
  description,
  id,
  features,
  userID,
  comments,
}: Props) {
  const [section, setSection] = useState("INTRO");

  return (
    <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-3">
      <div className="flex items-center max-sm:text-sm gap-3">
        <button
          onClick={() => setSection("INTRO")}
          className={`px-3 py-2 cursor-pointer rounded-lg ${
            section === "INTRO"
              ? "text-blue-600"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          معرفی
        </button>

        <button
          onClick={() => setSection("FEATU")}
          className={`px-3 py-2 cursor-pointer rounded-lg ${
            section === "FEATU"
              ? "text-blue-600"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          مشخصات
        </button>

        <button
          onClick={() => setSection("COMME")}
          className={`px-3 py-2 cursor-pointer rounded-lg ${
            section === "COMME"
              ? "text-blue-600"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          دیدگاه ها
        </button>
      </div>

      <div className="mt-5">
        {section === "INTRO" && <Intro description={description} />}
        {section === "FEATU" && <Features id={id} features={features} />}
        {section === "COMME" && (
          <CommentContainer userID={userID} id={id} comments={comments} />
        )}
      </div>
    </div>
  );
}

const ContainerFeCoIN = memo(ContainerFeCoINComponent);

ContainerFeCoIN.displayName = "ContainerFeCoIN";

export default ContainerFeCoIN;
