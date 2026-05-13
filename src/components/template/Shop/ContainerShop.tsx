"use client";
import { useEffect, useState } from "react";
import ConProducts from "./ConProducts/ConProducts";
import FilterCom from "./Filter/FilterCom";

export default function ContainerShop() {
  const [productState, setProductState] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(350000);
  const [checkType, setCheckType] = useState("all");
  const [listType, setListType] = useState("pop");

  const minLimit = 0;
  const maxLimit = 3500000;

  const filterProducts = async () => {
    const res = await fetch(
      `/api/filterProduct?isStock=${inStock}&subCategory=${checkType}&filter=${listType}`,
    );
    const data = await res.json();
    setProductState(data);
  };

  useEffect(() => {
    filterProducts();
  }, [inStock, checkType, listType]);

  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="max-sm:col-span-12 col-span-3">
        <div>
          <FilterCom
            setListType={setListType}
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
      <div className="max-sm:col-span-12 max-sm:row-start-1 col-span-9">
        <ConProducts
          products={productState}
          listType={listType}
          setListType={setListType}
        />
      </div>
    </div>
  );
}
