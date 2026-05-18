"use client";

import { useCallback, useState } from "react";
import FormBrand from "../Form/FormBrand";
import TableBrand from "../Table/TableBrand";

export default function BrandContainer() {
  const [brandState, setBrandState] = useState([]);
  const [totalPageState, setTotalPageState] = useState(0);

  const getBrands = useCallback(async (page: number) => {
    const res = await fetch(`/api/brand?page=${page}`);
    const result = await res.json();
    if (res.ok) {
      setBrandState(result.brands);
      setTotalPageState(result.totalPages);
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
          setBrandState={setBrandState}
        />
      </div>
    </div>
  );
}
