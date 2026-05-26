import { authUser } from "@/app/utils/auth";
import MenuMobileClient from "./MenuMobileClient";
import { categories } from "./data";
import MenuMobileAdmin from "./MenuMobileAdmin";
import { connection } from "next/server";

export default async function MenuMobileJSX({ isAdmin }: { isAdmin: boolean }) {
  await connection();
  const { user } = await authUser();
  const isUser = Boolean(user);
  return (
    <>
      {isAdmin ? (
        <MenuMobileAdmin />
      ) : (
        <MenuMobileClient categories={categories} isUser={isUser} user={user} />
      )}
    </>
  );
}
