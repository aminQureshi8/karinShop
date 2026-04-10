"use client";

import { useForm } from "react-hook-form";
import Modal from "@/components/module/Modal/Modal";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

export default function OrderEditModal({
  isOpen,
  setIsOpen,
  editOrder,
  setEditOrder,
  onSubmit,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  if (!editOrder) return null;

  const removeProduct = (id: string) => {
    setEditOrder((prev: any) => ({
      ...prev,
      products: prev.products.filter((p: any) => p._id !== id),
    }));
  };

  const increase = (id: string, max: number) => {
    setEditOrder((prev: any) => ({
      ...prev,
      products: prev.products.map((p: any) =>
        p._id === id && p.quantity < max
          ? { ...p, quantity: p.quantity + 1 }
          : p,
      ),
    }));
  };

  const decrease = (id: string) => {
    setEditOrder((prev: any) => ({
      ...prev,
      products: prev.products.map((p: any) =>
        p._id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    }));
  };

  const editOrders = (data: any) => {
    setIsLoading(true);

    const finalData = {
      orderId: editOrder._id,
      phone: data.phone,
      address: data.address,
      status: data.status,
      products: editOrder.products.map((p: any) => ({
        productId: p._id,
        quantity: p.quantity,
      })),
    };

    onSubmit(finalData);

    setIsLoading(false);
    setIsOpen(false);
    setEditOrder(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setEditOrder(null);
      }}
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
      <div className="space-y-4">
        <input
          {...register("phone", { required: true })}
          defaultValue={editOrder.phone}
          placeholder="شماره تلفن"
          className="bg-gray-100 dark:bg-black/60 w-full p-2 rounded-lg"
        />

        <input
          {...register("address", { required: true })}
          defaultValue={editOrder.address}
          placeholder="آدرس"
          className="bg-gray-100 dark:bg-black/60 w-full p-2 rounded-lg"
        />

        <select
          {...register("status", { required: true })}
          defaultValue={editOrder.status}
          className="bg-gray-100 dark:bg-black/60 w-full p-2 rounded-lg"
        >
          <option value="pending">در انتظار بررسی</option>
          <option value="preparing">آماده سازی</option>
          <option value="shipping">در حال ارسال</option>
          <option value="delivered">ارسال شده</option>
          <option value="cancelled">لغو شده</option>
        </select>

        <div className="grid grid-cols-3 gap-4">
          {editOrder.products.map((p: any) => (
            <div key={p._id}>
              <div
                className="flex justify-center cursor-pointer"
                onClick={() => removeProduct(p._id)}
              >
                <Image
                  src="/image/lap.png"
                  width={100}
                  height={100}
                  alt="product"
                />
              </div>

              <p className="text-sm line-clamp-1">{p.title}</p>

              <div className="flex justify-between border p-2 rounded-lg mt-2">
                <div onClick={() => increase(p._id, p.product.count)}>
                  <GoPlus className="text-green-500" />
                </div>

                <div>{p.quantity}</div>

                <div onClick={() => decrease(p._id)}>
                  <FiMinus className="text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
