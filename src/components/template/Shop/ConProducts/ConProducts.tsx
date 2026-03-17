import SwiperProduct from "../../Home/SwiperProduct/SwiperProduct";

export default function ConProducts({ products }: { products: any }) {
  console.log("products --- >", products);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div>
          <p>مرتب سازی:</p>
        </div>
        <ul className="flex items-center gap-5 *:cursor-pointer transition-colors dark:text-gray-400 *:hover:text-blue-500">
          <li>محبوب ترین</li>
          <li>پرفروش ترین</li>
          <li>ارزان ترین</li>
          <li>گران ترین</li>
        </ul>
      </div>
      <div className="mt-5 w-full">
        <div className="grid grid-cols-4 gap-5">
          {products.map((pro: any) => (
            <div key={pro._id}>
              <SwiperProduct product={pro} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
