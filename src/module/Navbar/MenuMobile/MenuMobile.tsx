"use client";
import { memo } from "react";
import { toggleMenu } from "@/app/redux/slices/MenuMobile/MenuMobile";

import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";

const MenuMobile = memo(() => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(toggleMenu())}
        className="border-2 border-gray-200 dark:border-gray-700 rounded-full p-2"
      >
        <IoIosMenu size={19} />
      </button>
    </div>
  );
});

export default MenuMobile;
