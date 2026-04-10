"use client";
import TableLayout from "@/components/module/Table/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "@/components/module/Pagination/Pagination";
import OrderTableSkeleton from "./OrderTableSkeleton";

const OrderTableContent = memo(
  ({
    orders,
    getOrders,
    currentPage,
    setIsOpen,
    setCurrentPage,
    totalPages,
    setEditOrder,
  }: any) => {
    const [orderClick, setOrderClick] = useState([]);

    useEffect(() => {
      getOrders(currentPage);
    }, [currentPage]);

    const clickProduct = (id: string, check: any) => {
      if (check) {
        const finds = orderClick.some((p) => p === id);
        if (!finds) {
          setOrderClick((pre: any) => [...pre, id]);
        }
      } else {
        setOrderClick((pre: any) => pre.filter((p: any) => p !== id));
      }
    };

    const removeMany = async () => {
      const splitOrders = orderClick.map((p) => p).join("|");
      try {
        const res = await fetch(
          `/api/admin/order?orders=${splitOrders}&isManySelect=true`,
          {
            method: "DELETE",
          },
        );
        console.log(res);

        if (res.ok) {
          getOrders(1);
          setOrderClick([]);
        }
      } catch (error) {}
    };

    const changeCondition = async (id: string, status: string) => {
      try {
        const res = await fetch(`/api/admin/order?id=${id}&status=${status}`, {
          method: "PATCH",
          cache: "no-store",
        });

        console.log(res);

        if (!res.ok) {
          throw new Error("Failed to update order status");
        }

        await getOrders(currentPage);
      } catch (error) {
        console.error("Status update error:", error);
      }
    };

    return (
      <>
        <div>
          <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
            <TableLayout>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">
                    <div className="relative h-6 flex items-center justify-center overflow-hidden">
                      <span
                        className={`absolute transition-all duration-300 ${
                          orderClick.length === 0
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                        }`}
                      >
                        انتخاب
                      </span>

                      <span
                        className={`absolute transition-all duration-300 ${
                          orderClick.length !== 0
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <MdDelete
                          onClick={removeMany}
                          size={18}
                          className="cursor-pointer text-red-500 hover:text-red-600"
                        />
                      </span>
                    </div>
                  </TableHead>

                  <TableHead className="text-right font-bold">شناسه</TableHead>
                  <TableHead className="text-right font-bold">
                    شماره تلفن
                  </TableHead>
                  <TableHead className="text-right font-bold">ایمیل</TableHead>
                  <TableHead className="text-right font-bold">وضیعت</TableHead>
                  <TableHead className="text-right font-bold">
                    تغییر وضیعت
                  </TableHead>
                  <TableHead className="text-right font-bold">جزییات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <OrderTableSkeleton />
                ) : (
                  orders.map((order: any) => (
                    <TableRow
                      key={order._id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={orderClick.includes(order._id)}
                          onChange={(e) =>
                            clickProduct(order._id, e.target.checked)
                          }
                        />
                      </TableCell>
                      <TableCell>{order._id}</TableCell>

                      <TableCell>{order.phone}</TableCell>

                      <TableCell>{order.user.email}</TableCell>
                      <TableCell>{order.status}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className=" bg-transparent text-black dark:text-white hover:bg-gray-300 hover:dark:bg-gray-700">
                              لیست وضیعت
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                changeCondition(order._id, "pending")
                              }
                            >
                              در انتظار بررسی
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                changeCondition(order._id, "preparing")
                              }
                            >
                              آماده سازی
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                changeCondition(order._id, "shipping")
                              }
                            >
                              در حال ارسال
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                changeCondition(order._id, "delivered")
                              }
                            >
                              ارسال شده
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                changeCondition(order._id, "cancelled")
                              }
                            >
                              لغو شده
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setIsOpen(true);
                                setEditOrder(order);
                              }}
                            >
                              جزییات
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TableLayout>
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </>
    );
  },
);

export default OrderTableContent;
