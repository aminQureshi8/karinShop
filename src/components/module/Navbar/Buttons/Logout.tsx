"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const logOut = async () => {
    const response = await fetch("/api/auth/logOut", {
      method: "POST",
    });
    if (response.ok) {
      router.refresh();
    }
  };
  return (
    <>
      <button
        onClick={logOut}
      >
        خروج از حساب
      </button>
    </>
  );
}
