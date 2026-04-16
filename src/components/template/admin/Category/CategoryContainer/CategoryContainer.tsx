"use client";

import { useCallback, useState } from "react";
import Brand from "@/types/Brand/Brand.type";
import FormCategory from "../Form/FormCategory";
import TableCategory from "../Table/TableCategory";
import CategoryType from "@/types/Category/Category.type";

<<<<<<< HEAD
export default function CategoryContainer({
  categories,
  totalPages,
}: {
  categories: CategoryType[];
  totalPages: number;
}) {
  const [categoryState, setCategoryState] = useState([]);
  const [totalPageState, setTotalPageState] = useState(totalPages);
=======
export default function CategoryContainer() {
  const [categoryState, setCategoryState] = useState([]);
  const [totalPageState, setTotalPageState] = useState(0);
>>>>>>> providersFix

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
          setCategoryState={setCategoryState}
        />
      </div>
    </div>
  );
}
