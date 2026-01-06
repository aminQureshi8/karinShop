import { RiUserLine } from "react-icons/ri";
export default function UserNavbar() {
  return (
    <div>
      <button className="border-2 text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
        <RiUserLine />
        حساب کاربری
      </button>
    </div>
  );
}
