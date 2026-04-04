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
import { useEffect, useState } from "react";
import Modal from "@/components/module/Modal/Modal";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function OrderTable({ orders }: { orders: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderClick, setOrderClick] = useState([]);

  const [productCounters, setProductCounters] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    console.log(productCounters);
  }, [productCounters]);

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    mode: "all",
  });

  interface IFormInput {
    phone: string;
    address: string;
  }

  const increase = (id: string, max: number) => {
    setProductCounters((prev) => {
      if (prev[id] < max) {
        return { ...prev, [id]: prev[id] + 1 };
      }
      return prev;
    });
  };

  const decrease = (id: string) => {
    setProductCounters((prev) => {
      const current = prev[id] || 1;
      if (current > 1) {
        return { ...prev, [id]: current - 1 };
      }
      return prev;
    });
  };

  const removeImg = (id: string) => {
    setEditOrder((pre: any) => {
      const updatedProduct = pre.products.filter((p: any) => p._id !== id);

      if (updatedProduct.length) {
        return { ...pre, products: updatedProduct };
      }

      return pre;
    });
  };

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
    } catch (error) {}
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ویرایش سفارش"
        isLoading={isLoading}
        acceptLabel="تغییر"
        declineLabel="لغو"
        onDecline={() => {
          setIsOpen(false);
          setEditOrder(null);
        }}
      >
        <>
          <div className="space-y-4">
            <div>
              <input
                {...register("phone", { required: "پر کردن فیلد الزامی است" })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 transition-all"
                placeholder="شماره تلفن"
                defaultValue={editOrder?.phone}
              />
            </div>
            <div>
              <input
                type="text"
                {...register("address", {
                  required: "پر کردن فیلد الزامی است",
                })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 transition-all"
                placeholder="آدرس"
                defaultValue={editOrder?.user.email}
              />
            </div>

            <div>
              <label htmlFor="">سفارشات</label>
              <div className="grid max-sm:grid-cols-1 gap-5 grid-cols-3">
                {editOrder?.products.map((p: any) => (
                  <div key={p._id} className="cursor-pointer">
                    <div
                      className="flex justify-center"
                      onClick={() => removeImg(p._id)}
                    >
                      <Image
                        src="/image/lap.png"
                        width={100}
                        height={100}
                        alt="product"
                      />
                    </div>
                    <p className="line-clamp-1 max-sm:text-xs text-sm">
                      {p.title}
                    </p>

                    <div className="flex items-center justify-between border rounded-lg p-2 border-gray-200 dark:border-gray-600 mt-5">
                      <div
                        className="cursor-pointer"
                        onClick={() => increase(p._id, p.count)}
                      >
                        <GoPlus className="text-green-500" size={20} />
                      </div>

                      <div className="select-none ss02">
                        {productCounters[p._id] || 1}
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => decrease(p._id)}
                      >
                        <FiMinus className="text-red-500" size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </Modal>

      <div>
        <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-bold relative flex items-center overflow-hidden">
                  <span
                    className={`
      absolute w-full transition-all duration-300 ease-in-out
      ${
        orderClick.length !== 0
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }
    `}
                  >
                    <MdDelete
                      onClick={removeMany}
                      size={20}
                      className="cursor-pointer text-red-500"
                    />
                  </span>

                  <span
                    className={`
      absolute w-full transition-all duration-300 ease-in-out
      ${
        orderClick.length === 0
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }
    `}
                  >
                    انتخاب
                  </span>
                </TableHead>
                <TableHead className="text-right font-bold">
                  شماره تلفن
                </TableHead>
                <TableHead className="text-right font-bold">ایمیل</TableHead>
                <TableHead className="text-right font-bold">جزییات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow
                  key={order._id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        clickProduct(order._id, e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>{order.phone}</TableCell>

                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setIsOpen(true);
                            setEditOrder(order);
                            // وقتی مدال باز می‌شه، مقدار اولیه رو ست می‌کنیم
                            const countersInit: Record<string, number> = {};
                            order.products.forEach((p: any) => {
                              countersInit[p._id] = 1;
                            });
                            setProductCounters(countersInit);
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
              ))}
            </TableBody>
          </TableLayout>
        </div>
      </div>
    </>
  );
}
