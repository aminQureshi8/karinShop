import React from "react";
import { BiHeart } from "react-icons/bi";

export default function Buttons() {
  return (
    <div className="flex items-center max-sm:gap-1 gap-2 *:cursor-pointer">
      <div className="border rounded-full p-1.5 border-gray-300 dark:border-gray-600">
        <BiHeart  className=" text-gray-400 dark:text-gray-300 " />
      </div>
      <div className="border rounded-full p-1.5 border-gray-300 dark:border-gray-600">
        <BiHeart  className=" text-gray-400 dark:text-gray-300 " />
      </div>
      <div className="border rounded-full p-1.5 border-gray-300 dark:border-gray-600">
        <BiHeart  className=" text-gray-400 dark:text-gray-300 " />
      </div>
    </div>
  );
}
