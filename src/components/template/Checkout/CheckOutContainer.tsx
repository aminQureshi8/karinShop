"use client";
import { useState } from "react";
import CheckOut from "./CheckOut";
import CheckOutCart from "./CheckOutCart";
export default function CheckOutContainer({ id }: { id: string }) {
  const [post, setPost] = useState({ name: "pishtaz", price: 70000 });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto font-danaMed">
      <div className="grid grid-cols-12 gap-5">
        <div className="max-sm:col-span-12 col-span-8">
          <CheckOut id={id} post={post} setPost={setPost} setIsLoading={setIsLoading} />
        </div>
        <div className="max-sm:col-span-12 col-span-4">
          <CheckOutCart post={post} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
