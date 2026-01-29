import { authUser } from "@/app/utils/auth";
import Link from "next/link";
import { RiUserLine } from "react-icons/ri";
export default async function UserNavbar() {
  const { user } = await authUser();
  console.log(user);

  return (
    <div>
      {user ? (
        <button className="border-2 text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
          <RiUserLine />
          حساب کاربری
        </button>
      ) : (
        <Link href="/auth">
          <button className="border-2 text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
            <RiUserLine />
            ورود / ثبت نام
          </button>
        </Link>
      )}
    </div>
  );
}
