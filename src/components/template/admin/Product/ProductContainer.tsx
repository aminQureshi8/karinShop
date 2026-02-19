"use client"
import { useState } from "react";
import Search from "./Search/Search";
import TableProduct from "./TableProduct/TableProduct";

export default function ProductContainer({ products }: any) {

  const [productState, setProductState] = useState([...products])

  const getProducts = async (page: number) => {
    const res = await fetch(`/api/product?page=${page}`)
    const result = await res.json()

    setProductState(result.products)
  }

  return (
    <div>
      <div>
        <Search />
      </div>
      <div>
        <TableProduct products={productState} getProducts={getProducts} />
      </div>
    </div>
  );
}
