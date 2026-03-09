import React from "react";

export default function ProductOrder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 font-danaMed">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
            <h2>سبد خرید</h2>
            <p>(2 کالا)</p>
        </div>
        <div>
            <button>حذف همه</button>
        </div>
      </div>
    </div>
  );
}
