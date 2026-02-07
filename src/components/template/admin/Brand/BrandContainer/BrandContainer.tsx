"use client";

import { useState } from "react";
import FormBrand from "../Form/FormBrand";
import TableBrand from "../Table/TableBrand";
import Brand from "@/types/Brand/Brand.type";



export default  function BrandContainer({ brands }: { brands: Brand[] }) {
  const [brandState, setBrandState] = useState([...brands]);

    const getBrands = async () => {
    const res = await fetch("/api/brand");
    const result = await res.json();

    if (res.ok) {
      setBrandState(result);
    }

    console.log(result);
  };

  return (
    <div>
      <div>
        <FormBrand  getBrands={getBrands} />
      </div>
      <div className="mt-5">
        <TableBrand brands={brandState} getBrands={getBrands} />
      </div>
    </div>
  );
}
