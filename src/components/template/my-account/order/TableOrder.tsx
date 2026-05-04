"use client";
import TableLayout from "@/components/module/Table/Table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVerticalIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TableOrder({ id }: { id: string }) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      const res = await fetch(`/api/order?id=${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      setOrder(data);
    };

    getOrder();
  }, []);
  return (
    <div className="bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <h2>سفارش های من:</h2>

      <div>
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold">نام محصول</TableHead>
              <TableHead className="text-right font-bold">تاریخ</TableHead>
              <TableHead className="text-right font-bold">قیمت</TableHead>
              <TableHead className="text-right font-bold">وضیعت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.map((cat: any, index: any) => (
              <TableRow
                key={cat._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium max-w-[200px]">
                  <div className="space-y-2">
                    {cat.products.map((p: any) => (
                      <div
                        key={p.product._id}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={p.product.mainImage}
                          width={40}
                          height={40}
                          alt=""
                          className="rounded-md object-cover shrink-0"
                        />
                        <p className="text-xs truncate" title={p.product.title}>
                          {p.product.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  {new Date(cat.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>

                <TableCell className="font-medium">
                  {cat.products.map((p) => (
                    <p>{p.product.price.toLocaleString("fa-IR")}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {cat.status === "pending" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold  text-yellow-700">
                      در انتظار بررسی
                    </span>
                  )}

                  {cat.status === "accepted" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold  text-green-700">
                      تایید شده
                    </span>
                  )}

                  {cat.status === "rejected" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold  text-red-700">
                      رد شده
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableLayout>
      </div>
    </div>
  );
}
