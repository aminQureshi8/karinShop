"use client";

import { useState } from "react";
import DOMPurify from "dompurify";

export default function Intro({ description }: { description: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={`leading-8  transition-all ${
          open ? "max-h-none" : "max-h-[160px] overflow-hidden"
        }`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />

      {/* Fade پایین متن */}
      {!open && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-19 bg-gradient-to-t from-transparent to-gray-50 dark:from-transparent dark:to-gray-800 " />
      )}

      <button
        onClick={() => setOpen(!open)}
        className="mt-4 text-blue-600 z-50 text-sm font-medium"
      >
        {open ? "مشاهده کمتر" : "مشاهده بیشتر"}
      </button>
    </div>
  );
}
