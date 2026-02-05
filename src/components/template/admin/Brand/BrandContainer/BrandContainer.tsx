"use client";

import { useState } from "react";
import FormBrand from "../Form/FormBrand";
import TableBrand from "../Table/TableBrand";
import Brand from "@/types/Brand/Brand.type";



export default  function BrandContainer({ brands }: { brands: Brand[] }) {
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
