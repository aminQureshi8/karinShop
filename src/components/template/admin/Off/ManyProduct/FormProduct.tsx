"use client";

import { memo, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import jalaali from "jalaali-js";
const FormProduct = memo(
  ({
    productsClick,
    getProducts,
  }: {
    productsClick: any;
    getProducts: any;
  }) => {
    const [percent, setPercent] = useState("");
    const [selectedDay, setSelectedDay] = useState<any>(null);

    const addOffs = async (e: React.FormEvent) => {
      e.preventDefault();

      const g = jalaali.toGregorian(
        selectedDay.year,
        selectedDay.month,
        selectedDay.day,
      );

      const iso = new Date(g.gy, g.gm - 1, g.gd).toISOString();

      const mapProducts = productsClick.join("|");

      try {
        const res = await fetch(
          `/api/admin/off?option=many&products=${mapProducts}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ percent, dateTime: iso }),
          },
        );

        const data = await res.json();
        ;

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
          <div className="flex flex-col gap-2">
            <label>پایان تخفیف</label>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              locale="fa"
              shouldHighlightWeekends
              inputClassName="bg-gray-200! dark:bg-gray-800! p-2! rounded-lg! w-full! text-center! focus:ring-2! focus:ring-blue-500!"
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer"
          >
            اعمال کد تخفیف
          </button>
        </div>
      </form>
    );
  },
);

export default FormProduct;
