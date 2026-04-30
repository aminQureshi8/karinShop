import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function LaconicProduct() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="mt-8 bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <h2>خلاصه سفارش</h2>

      <div className="grid grid-cols-4 gap-3 mt-5">
        {cart.map((item, index) => (
          <div key={index}>
            <div>
              <Image src={item.mainImage} alt="product" width={200} height={200} />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 p-2 size-3 rounded-full"></div>
              <p>ابی</p>
            </div>
            <div className="flex items-center gap-2">
              <p>مبلغ:</p>
              <p>{item.price.toLocaleString("fa-IR")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
