"use client";
import { closeMenu } from "@/app/redux/slices/MenuMobile/MenuMobile";
import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";

export default function LogOutBtn({
  isMobileMenuFea,
}: {
  isMobileMenuFea: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logOut = async () => {
    setLoading(true);
    try {
      if (isMobileMenuFea) {
        dispatch(closeMenu());
      }

      await signOut({
        redirect: true,
        callbackUrl: "/regLogin/auth",
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={!loading ? logOut : undefined}
      className={`flex items-center gap-3 py-2 pr-2 transition-all rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-red-500"}`}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin text-red-500" />
      ) : (
        <LogOut size={20} className="text-red-500" />
      )}
      <span className="text-sm text-red-500">
        {loading ? "در حال خروج..." : "خروج"}
      </span>
    </div>
  );
}
