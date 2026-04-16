"use client";

import Cart from "./Cart";

// import dynamic from "next/dynamic";

// const Cart = dynamic(() => import("./Cart"), {
//   ssr: false, // جلوگیری از mismatch
//   loading: () => <div className="h-40 w-full animate-pulse bg-gray-200 rounded"></div>,
// });

export default function CartWrapper(props) {
  return <Cart {...props} />;
}
