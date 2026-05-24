import { memo } from "react";
import Buttons from "./Buttons/Buttons";
import ColorPick from "./Color/ColorPick";

function InformationProduct({
  colors,
  features,
  price,
  title,
  id,
  imageUrls,
  mainCount,
  breadCrumbs,
  brand,
}: any) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 dark:text-green-400">
          {breadCrumbs?.map((b: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <p>{b}</p>
              <p>/</p>
            </div>
          ))}
        </div>
        <div>
          <Buttons
            price={price}
            title={title}
            id={id}
            imageUrls={imageUrls}
            mainCount={mainCount}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h1>
          گوشی موبایل اپل مدل iPhone 16 دو سیم کارت ظرفیت 128 گیگابایت و رم 8
        </h1>
        <h2 className="text-xs">
          Apple iPhone 16 CH Dual SIM Storage 128GB And RAM 8GB Mobile Phone
        </h2>
      </div>

      <ColorPick colors={colors} />

      <div>
        <p>ویژگی</p>

        <div className="grid max-sm:grid-cols-2 grid-cols-3 gap-3 mt-2">
          <div className={`bg-gray-100  dark:bg-black  rounded-lg p-2`}>
            <p className="text-sm  text-gray-500">برند</p>
            <p className="mt-2 ss02">{brand}</p>
          </div>

          {features.slice(0, 6).map((feature: any, index: number) => (
            <div
              key={index}
              className={`bg-gray-100 ${index === 0 && "hidden"} dark:bg-black  rounded-lg p-2`}
            >
              <p className="text-sm  text-gray-500">{feature.name}</p>
              <p className="mt-2 ss02 line-clamp-1">{feature.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(InformationProduct);
