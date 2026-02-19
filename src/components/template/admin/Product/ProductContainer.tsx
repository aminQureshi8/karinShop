import React from "react";
import Search from "./Search/Search";
import TableProduct from "./TableProduct/TableProduct";

export default function ProductContainer({products} : any) {
  return (
    <div>
      <div>
        <Search />
      </div>
      <div>
        <TableProduct products={products} />
      </div>
    </div>
  );
}
