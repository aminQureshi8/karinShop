"use client";

import { useEffect, useRef } from "react";

export default function IncrementView({ slug }: { slug: string }) {
  const hasSent = useRef(false);

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;

    const key = `viewed-blog-${slug}`;

    if (localStorage.getItem(key)) return;

    const incrementView = async () => {
      const res = await fetch("/api/blog/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        localStorage.setItem(key, "true");
      }
    };

    incrementView();
  }, [slug]);

  return null;
}
