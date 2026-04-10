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
import Pagination from "@/components/module/Pagination/Pagination";

export default function OrderTable({
  orders,
  totalPages,
}: {
  orders: any;
  totalPages: number;
}) {
  const [orderState, setOrderState] = useState([]);
  const [intialState, setIntialState] = useState([...orders]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderClick, setOrderClick] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [changeCondition, setChangeCondition] = useState(second)

  const [productCounters, setProductCounters] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    // if (currentPage === 1) {
    //   setOrderState(orders);
    //   return;
    // } else {
    getOrders(currentPage);
    // }
  }, [currentPage]);

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    mode: "all",
  });

  interface IFormInput {
    phone: string;
    address: string;
    status: string;
  }

  const getOrders = async (page: number) => {
    const res = await fetch(`/api/admin/order?page=${page}`);
    const data = await res.json();
    setOrderState(data);
  };

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

      if (res.ok) {
        getOrders(1);
        setOrderClick([]);
        setCurrentPage(1);
      }
    } catch (error) {}
  };

  const editOrders = async (data: any) => {
    console.log(productCounters, "---", data.phone);
    const res = await fetch(`/api/admin/order?id=${editOrder._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        email: data.email,
        productCounters,
      }),
    });

    const dataRes = await res.json();

    console.log(dataRes);
  };

  const changeCondition = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/order?id=${id}&status=${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      getOrders(currentPage);
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAccept={handleSubmit(editOrders)}
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
              <select
                {...register("status", { required: true })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 transition-all"
                defaultValue={editOrder?.status}
              >
                <option value="pending">در انتظار بررسی</option>
                <option value="preparing">آماده سازی</option>
                <option value="shipping">در حال ارسال</option>
                <option value="delivered">ارسال شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
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
              {orderState.map((order: any) => (
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
                        <Button variant="ghost" size="icon" className="size-8">
                          لیست وضیعت
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => changeCondition(order._id, "pending")}
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
                          onClick={() => changeCondition(order._id, "shipping")}
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
                            // const countersInit: Record<string, number> = {};
                            // order.products.forEach((p: any) => {
                            //   countersInit[p._id] = 1;
                            // });
                            // setProductCounters(countersInit);
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

      {totalPages !== 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
