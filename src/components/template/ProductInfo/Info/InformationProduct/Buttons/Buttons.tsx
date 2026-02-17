import React from "react";
import { BiHeart } from "react-icons/bi";

export default function Buttons() {
  return (
    <div className="flex items-center gap-3 *:cursor-pointer">
      <div className="border rounded-full p-1.5 dark:border-gray-600">
        <BiHeart size={19} className="text-gray-300" />
      </div>
      <div className="border rounded-full p-1.5 dark:border-gray-600">
        <BiHeart size={19} className="text-gray-300" />
      </div>
      <div className="border rounded-full p-1.5 dark:border-gray-600">
        <BiHeart size={19} className="text-gray-300" />
      </div>
    </div>
  );
}
