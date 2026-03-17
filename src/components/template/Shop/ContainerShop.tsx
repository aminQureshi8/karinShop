"use client";
import { useEffect, useState } from "react";
import ConProducts from "./ConProducts/ConProducts";
import FilterCom from "./Filter/FilterCom";

export default function ContainerShop({ products }: { products: any }) {
  const [productState, setProductState] = useState([...products]);
  const [inStock, setInStock] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(350000);
  const [checkType, setCheckType] = useState("all");

  const minLimit = 0;
  const maxLimit = 3500000;

  const filterProducts = async () => {
    const res = await fetch(
      `/api/filterProduct?isStock=${inStock}&subCategory=${checkType}`,
    );
    const data = await res.json();
    setProductState(data);
  };

  useEffect(() => {
    filterProducts();
  }, [inStock, checkType]);

  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="col-span-3">
        <div>
          <FilterCom
            checkType={checkType}
            setCheckType={setCheckType}
            inStock={inStock}
            setInStock={setInStock}
            min={min}
            setMin={setMin}
            max={max}
            setMax={setMax}
            minLimit={minLimit}
            maxLimit={maxLimit}
            step={1000}
          />
        </div>
      </div>
      <div className="col-span-9">
        <ConProducts products={productState} />
      </div>
    </div>
  );
}
