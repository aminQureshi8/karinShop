import React from "react";

export default function BreadCrumbs({ children }) {
  return (
    <div className="flex items-center max-sm:text-sm gap-2">{children}</div>
  );
}
