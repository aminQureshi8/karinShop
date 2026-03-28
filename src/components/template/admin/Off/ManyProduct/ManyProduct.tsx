"use client";
import { useState } from "react";
import FormProduct from "./FormProduct";
import ProductTable from "./ProductTable";

export default function ManyProduct({
  products,
  totalPages,
}: {
  products: any;
  totalPages: number;
}) {
  const [productsClick, setProductsClick] = useState([]);
  const [productState, setProductState] = useState([...products]);
  const [totalPagesState, setTotalPagesState] = useState(totalPages);
  const [intialProduct, setIntialProduct] = useState([...products]);


  const getProducts = async (page: number) => {
    const res = await fetch(`/api/admin/off?page=${page}`);
    const data = await res.json();

    setProductState(data.products);
    setTotalPagesState(data.totalPage);
  };

  return (
    <div>
      <div>
        <FormProduct productsClick={productsClick} getProducts={getProducts} />
      </div>
      <div className="mt-5">
        <ProductTable
          products={productState}
          setProductState={setProductState}
          productsClick={productsClick}
          setProductsClick={setProductsClick}
          totalPages={totalPagesState}
          getProducts={getProducts}
          intialProduct={intialProduct}
        />
      </div>
    </div>
  );
}
