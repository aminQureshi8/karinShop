"use client";

import { useCallback, useState } from "react";
import Brand from "@/types/Brand/Brand.type";
import FormCategory from "../Form/FormCategory";
import TableCategory from "../Table/TableCategory";
import CategoryType from "@/types/Category/Category.type";

export default function CategoryContainer({
  categories,
  totalPages,
}: {
  categories: CategoryType[];
  totalPages: number;
}) {
  const [categoryState, setCategoryState] = useState([...categories]);
  const [totalPageState, setTotalPageState] = useState(totalPages);
  const [intialCategory, setintialCategory] = useState([...categories]);

  const getCategories = useCallback(async (page: number) => {
    const res = await fetch(`/api/category?page=${page}`);
    const result = await res.json();
    if (res.ok) {
      setCategoryState(result.categories);
      setTotalPageState(result.totalPages);
    }
  }, []);

  return (
    <div>
      <div>
        <FormCategory getCategories={getCategories} />
      </div>
      <div className="mt-5">
        <TableCategory
          categories={categoryState}
          getCategories={getCategories}
          totalPageState={totalPageState}
          intialCategory={intialCategory}
          setCategoryState={setCategoryState}
        />
      </div>
    </div>
  );
}
