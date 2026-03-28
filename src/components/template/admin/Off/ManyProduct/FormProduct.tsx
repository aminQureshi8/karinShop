"use client";

import { memo, useState } from "react";

const FormProduct = memo(
  ({
    productsClick,
    getProducts,
  }: {
    productsClick: any;
    getProducts: any;
  }) => {
    const [percent, setPercent] = useState("");
    const [dateTime, setDateTime] = useState("");

    const addOffs = async (e: React.FormEvent) => {
      e.preventDefault();

      const mapProducts = productsClick.join("|");

      try {
        const res = await fetch(
          `/api/admin/off?option=many&products=${mapProducts}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ percent, dateTime }),
          },
        );

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          getProducts(1);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <form onSubmit={addOffs}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label>درصد تخفیف</label>
            <input
              type="text"
              placeholder="30"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label>پایان تخفیف</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="bg-gray-200 ss02 text-sm dark:bg-black/60 mt-2.5 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-500 px-3 py-2 rounded-lg cursor-pointer"
          >
            اعمال کد تخفیف
          </button>
        </div>
      </form>
    );
  },
);

export default FormProduct;
