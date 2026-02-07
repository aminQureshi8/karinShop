"use client";

import { useCallback, useState } from "react";
import FormBrand from "../Form/FormBrand";
import TableBrand from "../Table/TableBrand";
import Brand from "@/types/Brand/Brand.type";

export default function BrandContainer({
  brands,
  totalPages,
}: {
  brands: Brand[];
  totalPages: number;
}) {
  const [brandState, setBrandState] = useState([...brands]);
  const [totalPageState, setTotalPageState] = useState(totalPages);
  const [intialBrand, setintialBrand] = useState([...brands]);

  const getBrands = useCallback(async (page: number) => {
    const res = await fetch(`/api/brand?page=${page}`);
    const result = await res.json();
    if (res.ok) {
      setBrandState(result.brands);
      setTotalPageState(result.totalPages);

      console.log(result.brands);
      
    }
  }, []);

  return (
    <div>
      <div>
        <FormBrand getBrands={getBrands} />
      </div>
      <div className="mt-5">
        <TableBrand
          brands={brandState}
          getBrands={getBrands}
          totalPageState={totalPageState}
          intialBrand={intialBrand}
          setBrandState={setBrandState}
        />
      </div>
    </div>
  );
}
