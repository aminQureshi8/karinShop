"use client";

import { useState } from "react";
import Intro from "./Intro/Intro";
import Features from "./Intro/Features";

export default function ContainerFeCoIN({description , features}) {
  const [section, setSection] = useState("INTRO");
  return (
    <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-3">
      <div className="flex items-center gap-3">
        <div>
          <button
            onClick={() => setSection("INTRO")}
            className={`px-3 py-2 cursor-pointer rounded-lg ${section === "INTRO" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
          >
            معرفی
          </button>
        </div>
        <div>
          <button
            onClick={() => setSection("FEATU")}
            className={`px-3 py-2 cursor-pointer rounded-lg ${section === "FEATU" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
          >
            مشخصات
          </button>
        </div>
        <div>
          <button
            onClick={() => setSection("COMME")}
            className={`px-3 py-2 cursor-pointer rounded-lg ${section === "COMME" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
          >
            دیدگاه ها
          </button>
        </div>
      </div>

      <div className="mt-5">
        {section === "INTRO" && <Intro description={description} />}
        {section === "FEATU" && <Features features={features} />}
        {section === "COMME" && <>h</>}
      </div>
    </div>
  );
}
