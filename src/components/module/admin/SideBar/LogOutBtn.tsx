"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LogOutBtn() {
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
    <div onClick={logOut}>
      <div className="flex items-center cursor-pointer gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-red-500 rounded-lg">
        <LogOut size={20} className="text-red-500" />
        <span className="text-sm text-red-500">خروج</span>
      </div>
    </div>
  );
}
