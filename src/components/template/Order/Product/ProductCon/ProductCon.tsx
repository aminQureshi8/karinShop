"use client";
import { useEffect, useState } from "react";

import Product from "../Product/Product";

export default function ProductCon() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const getCarts = JSON.parse(localStorage.getItem("cart") || "[]");
    setCarts(getCarts);
  }, []);

  return (
    <div className="flex flex-col divide-y-2 space-y-5 mt-5">
      {carts.map((cart: any) => (
        <Product {...cart} />
      ))}
    </div>
  );
}
