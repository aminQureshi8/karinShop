import { authUser } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await authUser();

  if (!user.user) {
    redirect("/");
  }

  return <div>page</div>;
}
