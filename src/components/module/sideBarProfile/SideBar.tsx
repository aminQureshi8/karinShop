import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import userModel from "@/models/user";
import SidebarLinks from "./SidebarLinks";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const SideBar = memo(async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const findUser = await userModel.findOne(
    { _id: user?.user?._id },
    "name phone",
  );

  return (
    <div className="bg-white rounded-lg dark:bg-slate-800">
      <div className="p-3">
        <div className="flex items-center justify-between border-b-2 pb-3 dark:border-gray-700 border-gray-300">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="/image/user.webp"
                width={100}
                height={100}
                className="size-12 rounded-full"
                alt="No-Pic"
              />
            </div>
            <div>
              <h2 className="text-base font-semibold">
                {findUser?.name || "بدون نام"}
              </h2>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {findUser?.phone || "بدون شماره"}
              </p>
            </div>
          </div>
          <div>
            <Link href="/my-account/information">
              <CiEdit size={24} className="text-blue-500" />
            </Link>
          </div>
        </div>
        <SidebarLinks />
      </div>
    </div>
  );
});

export default SideBar;
