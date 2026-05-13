import { authUser } from "@/app/utils/auth";
import MenuMobileClient from "./MenuMobileClient";
import { categories } from "./data";

export default async function MenuMobileJSX({ isAdmin }) {
  const { user } = await authUser();
  const isUser = Boolean(user);
  return (
    <>
      {!isAdmin && (
        <MenuMobileClient categories={categories} isUser={isUser} user={user} />
      )}
    </>
  );
}
