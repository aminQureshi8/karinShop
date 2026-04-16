"use client";
import { useState } from "react";
import Search from "./Search/Search";
import TableProduct from "./TableProduct/TableProduct";

export default function ProductContainer() {
  const [productState, setProductState] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = async (page: number) => {
    const res = await fetch(`/api/admin/product?page=${page}`);
    const result = await res.json();
    console.log(result);

    setProductState(result.products);
    setTotalPages(result.totalPage);
  };

  return (
    <div>
      <div>
        <Search />
      </div>
      <div>
        <TableProduct products={productState} getProducts={getProducts} totalPages={totalPages} />
      </div>
    </div>
  );
}
