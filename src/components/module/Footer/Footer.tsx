import { BsInstagram, BsLinkedin, BsTelegram, BsYoutube } from "react-icons/bs";
import FooterTopBtn from "./FooterTopBtn";

export default async function Footer() {
  return (
    <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-5 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-2">
          <h2 className="text-white font-bold">درباره کارین شاپ</h2>
          <p className="text-gray-400 mt-5 leading-8">
            در فروشگاه آنلاین ما، بهترین مدل‌های موبایل و لپ‌تاپ از برندهای
            معتبر جهانی را با کیفیت بالا و قیمتی مناسب برای شما فراهم آورده‌ایم.
            با انتخاب محصولات ما، تجربه‌ای حرفه‌ای و لذت‌بخش از فناوری را در
            خانه یا محل کار داشته باشید.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <div className="bg-gray-900 p-3 rounded-xl">
              <BsInstagram size={23} className=" text-blue-500" />
            </div>
            <div className="bg-gray-900 p-3 rounded-xl">
              <BsTelegram size={23} className=" text-blue-500" />
            </div>
            <div className="bg-gray-900 p-3 rounded-xl">
              <BsLinkedin size={23} className=" text-blue-500" />
            </div>
            <div className="bg-gray-900 p-3 rounded-xl">
              <BsYoutube size={23} className=" text-blue-500" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold">دسترسی سریع</h2>
          <ul className="text-gray-400 flex flex-col gap-5 text-sm mt-5">
            <li>صحفه اصلی</li>
            <li>فروشگاه</li>
            <li>تماس با ما</li>
            <li>سوالات متداول</li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-bold">تماس با ما</h2>
          <ul className="text-gray-400 mt-5 text-sm">
            <li className="flex items-center justify-between">
              <p>شماره تماس:</p>
              <p>۰۹۰۵۲۰۱۸۷۵۱</p>
            </li>
          </ul>
        </div>
        <div>
          <FooterTopBtn />
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h2>کارین شاپ</h2>
        </div>
        <div className="relative">
          <input type="text" placeholder="از جدید ترین تخفیف ها با خبر شوید" className="bg-gray-800 rounded-lg p-2 w-82" />
          <div className="absolute left-0 top-0">
            <button className="bg-blue-500 text-white rounded-xl px-4">ثبت</button>
          </div>
        </div>
      </div>
    </div>
  );
}
