import { deCreaseCounter, inCreaseCounter } from "@/app/redux/slices/Cart/Cart";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Product({
  imageUrls,
  price,
  count,
  mainCount,
  id,
  title,
}: {
  imageUrls: string;
  price: number;
  count: number;
  mainCount: number;
  id: string;
  title: string;
}) {
  const [countState, setCountState] = useState(count);
  const dispatch = useDispatch();

  console.log("mainCount", mainCount);

  return (
    <div className="flex w-full pb-5">
      <div>
        <div className="">
          <Image src={imageUrls} width={300} height={300} alt="Image" />
        </div>
        <div className="border rounded-lg flex items-center  justify-between p-2">
          <div
            onClick={() =>
              setCountState((pre: number) => {
                if (pre >= mainCount) {
                  return pre;
                }
                const newCount = pre + 1;

                dispatch(inCreaseCounter({ id, count: newCount }));

                return newCount;
              })
            }
          >
            +
          </div>
          <div>{countState}</div>
          <div
            onClick={() =>
              setCountState((pre: number) => {
                if (pre <= 1) return 1;
                const newCount = pre - 1;

                dispatch(deCreaseCounter({ id, count: newCount }));

                return newCount;
              })
            }
          >
            -
          </div>
        </div>
      </div>

      <div className="grow">
        <div className="flex items-center w-full!  justify-between">
          <h2 className="text-sm">{title}</h2>
          <div>
            <button className="cursor-pointer text-lg">x</button>
          </div>
        </div>
        <div>
          <div>
            <p>{price * countState} تومان</p>
          </div>
        </div>
      </div>
    </div>
  );
}
