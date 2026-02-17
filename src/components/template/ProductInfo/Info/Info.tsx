import React from "react";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import InformationProduct from "./InformationProduct/InformationProduct";

export default function Info() {
  return (
    <div>
      <div>
        <BreadCrumbs />
      </div>

      <div className="grid grid-cols-12 rounded-lg dark:bg-gray-800 p-3">
        <div className="col-span-4">cdd</div>
        <div className="col-span-8">
          <InformationProduct />
        </div>
      </div>
    </div>
  );
}
