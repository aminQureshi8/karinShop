import Buttons from "./Buttons/Buttons";
import ColorPick from "./Color/ColorPick";

export default function InformationProduct({ colors, features }: any) {
  console.log(features);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 dark:text-green-400">
          <p>اپل</p>
          <p>/</p>
          <p>گوشی موبایل ساده</p>
        </div>
        <div>
          <Buttons />
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

        <div className="grid grid-cols-3 gap-3 mt-2">
          {
            features.slice(0, 6).map((feature: any, index: number) => <div key={index} className="bg-gray-100 dark:bg-black  rounded-lg p-2">
              <p className="text-sm text-gray-500">{feature.name}</p>
              <p className="mt-2 ss02">{feature.value}</p>
            </div>)
          }

        </div>
      </div>
    </div>
  );
}
