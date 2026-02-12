import React from "react";
import Search from "./Search/Search";
import TableProduct from "./TableProduct/TableProduct";

export default function ProductContainer() {
  return (
    <div>
      <div>
        <Search />
      </div>
      <div>
        <TableProduct />
      </div>
    </div>
  );
}
