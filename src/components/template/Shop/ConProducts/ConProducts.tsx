import Providers from "@/app/redux/Providers";
import SwiperProduct from "../../Home/SwiperProduct/SwiperProduct";

export default function ConProducts({
  products,
  listType,
  setListType,
}: {
  products: any;
  listType: string;
  setListType: any;
}) {
  const listItems = [
    {
      id: "pop",
      name: "محبوب ترین",
    },
    {
      id: "sale",
      name: "پر فروش ترین",
    },
    {
      id: "ch",
      name: "ارزان ترین",
    },
    {
      id: "ex",
      name: "گران ترین",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 max-sm:text-xs">
        <div>
          <p>مرتب سازی:</p>
        </div>
        <ul className="flex items-center max-sm:gap-3 gap-5 *:cursor-pointer transition-colors dark:text-gray-400 *:hover:text-blue-500">
          {listItems.map((li, index) => (
            <li
              onClick={() => setListType(li.id)}
              className={`${li.id === listType ? "text-blue-500" : ""}`}
              key={index}
            >
              {li.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 w-full">
        {products.length === 0 ? (
          <div className="flex items-center justify-center mt-10">
            <p>محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-5">
            {products.map((pro: any) => (
              <div key={pro._id}>
                <SwiperProduct product={pro} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
