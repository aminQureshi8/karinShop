"use client";

import { CiMobile1 } from "react-icons/ci";

export default function SubCate({
  title,
  _id,
  setBrandState,
}: {
  title: string;
  _id: string;
  setBrandState: any;
}) {
  const mouseEnter = async (id: string) => {
    const res = await fetch(`/api/brand/subCate?sub=${id}`);
    const data = await res.json();
    setBrandState(data.findsBrand);
  };

  return (
    <li
      onMouseEnter={() => mouseEnter(_id)}
      className="flex items-center gap-1"
    >
      <CiMobile1 size={20} />
      <p>{title}</p>
    </li>
  );
}
