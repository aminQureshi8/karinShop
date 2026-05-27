"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  const logOutHandler = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <button
        onClick={logOutHandler}
        className="w-full text-right cursor-pointer"
      >
        خروج از حساب
      </button>
    </>
  );
}
