"use client";

import { useEffect } from "react";

export default function NotificationInit() {
  useEffect(() => {
    new Notification("jfhjhgfj");
  }, []);

  return null;
}
