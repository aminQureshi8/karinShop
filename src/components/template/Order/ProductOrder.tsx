import { Trash } from "lucide-react";
import ProductCon from "./Product/ProductCon/ProductCon";

export default function ProductOrder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 font-danaMed rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2>سبد خرید</h2>
          <p>(2 کالا)</p>
        </div>
        <div>
          <button className="flex items-center gap-2 cursor-pointer text-sm">
            <p>حذف همه</p>
            <Trash size={17} />
          </button>
        </div>
      </div>
      <div>
        <ProductCon />
      </div>
    </div>
  );
}
