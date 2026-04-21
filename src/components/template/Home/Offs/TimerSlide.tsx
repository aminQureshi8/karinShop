"use client";
import { useEffect, useState } from "react";

export default function TimerSlide({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ h: "00", m: "00", s: "00" });
        return;
      }

      const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      );
      const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ h, m, s });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="h-full text-white flex flex-col justify-center gap-5 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-9">
          پیشنهاد
          <br />
          شگفت‌
          <br />
          انگیز
        </h2>

        <div className="flex gap-2 mt-4 text-sm justify-center">
          {[timeLeft.h, timeLeft.m, timeLeft.s].reverse().map((t, i) => (
            <span
              key={i}
              className="bg-white ss02 text-blue-600 px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <button className="text-sm opacity-80 hover:opacity-100 flex items-center justify-center">
        مشاهده همه
      </button>
    </div>
  );
}
