import Buttons from "./Buttons/Buttons";

export default function InformationProduct() {
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

      <div>
        <h1>
          گوشی موبایل اپل مدل iPhone 16 دو سیم کارت ظرفیت 128 گیگابایت و رم 8
        </h1>
        <h2>
          Apple iPhone 16 CH Dual SIM Storage 128GB And RAM 8GB Mobile Phone
        </h2>
      </div>

      <div>
        <p>ویژگی</p>

        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="dark:bg-black bg-gray-500 rounded-lg p-2">
            <p className="text-sm text-gray-500">رزولوشن دوربین اصلی</p>
            <p className="mt-2">48 مگاپیسکیل</p>
          </div>
        </div>
      </div>
    </div>
  );
}
