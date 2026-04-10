"use client";
import OrderTableContent from "./OrderTableContent";
import OrderEditModal from "./OrderEditModal";
import { useCallback, useState } from "react";

export default function OrderT() {
  const [orderState, setOrderState] = useState([]);
  const [totalPageState, setTotalPageState] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getOrders = useCallback(async (page: number) => {
    const res = await fetch(`/api/admin/order?page=${page}`);
    const data = await res.json();

    setOrderState(data.orders);
    setTotalPageState(data.totalPages);
  }, []);

  return (
    <>
      <OrderTableContent
        orders={orderState}
        setIsOpen={setIsOpen}
        getOrders={getOrders}
        setEditOrder={setEditOrder}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPageState}
        setOrderState={setOrderState}
      />

      <OrderEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editOrder={editOrder}
        setEditOrder={setEditOrder}
        // onSubmit={editOrders}
      />
    </>
  );
}
