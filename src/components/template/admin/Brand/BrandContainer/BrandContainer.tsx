"use client";

import { useState } from "react";
import FormBrand from "../Form/FormBrand";
import TableBrand from "../Table/TableBrand";

type Brand = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export default async function BrandContainer({ brands }: { brands: Brand[] }) {
  const [brandState, setBrandState] = useState([...brands]);

  return (
    <div>
      <div>
        <FormBrand setBrandState={setBrandState} />
      </div>
      <div className="mt-5">
        <TableBrand brands={brandState} />
      </div>
    </div>
  );
}
