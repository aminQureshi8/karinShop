"use client";
import Pagination from "@/components/module/Pagination/Pagination";
import TableLayout from "@/components/module/Table/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductTable({
  products,
  productsClick,
  setProductsClick,
  totalPages,
  getProducts,
  intialProduct,
  setProductState,
}: {
  products: any;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage === 1) {
      setProductState(intialProduct);
      return;
    }

    getProducts(currentPage);
  }, [currentPage]);

  const clickProduct = (id: string, check) => {
    if (check) {
      const finds = productsClick.some((pro: any) => pro === id);
      if (!finds) {
        setProductsClick((pre: any) => [...pre, id]);
      }
    } else {
      setProductsClick((pre: any) => pre.filter((p: any) => p !== id));
    }

    console.log(check);
  };

  return (
    <div>
      <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold">انتخاب</TableHead>
              <TableHead className="text-right font-bold">عکس</TableHead>
              <TableHead className="text-right font-bold">نام محصول</TableHead>
              <TableHead className="text-right font-bold">تخفیف</TableHead>
              <TableHead className="text-right font-bold">
                قیمت با تخفیف
              </TableHead>
              <TableHead className="text-right font-bold">قیمت اصلی</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any, index: any) => (
              <TableRow
                key={product._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium ss02">
                  {/* {(currentPage - 1) * 5 + index + 1} */}
                  <input
                    type="checkbox"
                    checked={productsClick.includes(product._id)}
                    onChange={(e) =>
                      clickProduct(product._id, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src="/image/lap.png"
                    width={100}
                    height={100}
                    alt="d"
                  />
                </TableCell>
                <TableCell>{product.slug}</TableCell>

                <TableCell>
                  {product.campaion ? product.campaion : "تحفیف ندارد"}
                </TableCell>

                <TableCell>
                  {product.campaion &&
                    product.price - (product.price * product.campaion) / 100}
                </TableCell>

                <TableCell>{product.price.toLocaleString("fa-IR")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableLayout>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
