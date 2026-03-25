"use client";

import { useState } from "react";
import ManyProduct from "./ManyProduct/ManyProduct";
import AllProduct from "./AllProduct/AllProduct";

export default function FormOff() {
  const [option, setOption] = useState("many");

  return (
    <div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="option"
            checked={option === "many"}
            onChange={() => setOption("many")}
          />
          <p> برای جند محصول</p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="option"
            checked={option === "all"}
            onChange={() => setOption("all")}
          />
          <p> برای کل محصولات</p>
        </div>
      </div>
      <div className="mt-8">{option === "many" ? <ManyProduct /> : <AllProduct />}</div>
    </div>
  );
}
