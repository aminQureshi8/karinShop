import MenuMobileClient from "./MenuMobileClient";
import { categories } from "./data";
import MenuMobileAdmin from "./MenuMobileAdmin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function MenuMobileJSX({ isAdmin }: { isAdmin: boolean }) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
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
