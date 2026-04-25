"use client";

import { CiMobile1, CiLaptop } from "react-icons/ci";
import * as CiIcons from "react-icons/ci";

export default function SubCate({
  title,
  _id,
  icon,
  setBrandState,
  setSection,
  href,
}: {
  title: string;
  _id: string;
  icon: string;
  href: string;
  setBrandState: any;
  setSection: any;
}) {
  const mouseEnter = async (id: string) => {
    const res = await fetch(`/api/brand/subCate?sub=${id}`);
    const data = await res.json();
    console.log(data);

    setBrandState(data.findsBrand);
    setSection(href);
  };

  const Icon = CiIcons[icon as keyof typeof CiIcons];

  console.log("icon", icon);

  return (
    <li
      onMouseEnter={() => mouseEnter(_id)}
      className="flex items-center gap-1"
    >
      {Icon && <Icon size={20} />}

      <p>{title}</p>
    </li>
  );
}
