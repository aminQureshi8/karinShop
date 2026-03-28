import { useState } from "react";

export default function AllProduct() {
  const [percent, setPercent] = useState("");
  const [dateTime, setDateTime] = useState("");

  const offSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/off?option=all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ percent, dateTime }),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {}
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
          className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-blue-600"
        >
          اعمال کد تخفیف
        </button>
      </div>
    </form>
  );
}
