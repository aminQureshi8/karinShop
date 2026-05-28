"use client";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import jalaali from "jalaali-js";
import { useState } from "react";

export default function AllProduct() {
  const [percent, setPercent] = useState("");
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const offSubmit = async (e: any) => {
    e.preventDefault();

    // جلوگیری از خطا
    if (!selectedDay) {
      alert("لطفا تاریخ پایان تخفیف را انتخاب کنید");
      return;
    }

    const g = jalaali.toGregorian(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day,
    );

    const iso = new Date(g.gy, g.gm - 1, g.gd).toISOString();

    try {
      const res = await fetch(`/api/admin/off?option=all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ percent, dateTime: iso }),
      });

      const data = await res.json();
      ;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={offSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="">درصد تخفیف</label>
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
          className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-blue-600"
        >
          اعمال کد تخفیف
        </button>
      </div>
    </form>
  );
}
