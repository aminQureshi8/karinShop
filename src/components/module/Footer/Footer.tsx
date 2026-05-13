import { BsInstagram, BsLinkedin, BsTelegram, BsYoutube } from "react-icons/bs";
import FooterTopBtn from "./FooterTopBtn";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-xl font-danaMed p-5 mb-12 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
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
          <ul className="text-gray-400 mt-5 text-sm flex flex-col gap-5">
            <li className="flex items-center justify-between">
              <p>شماره تماس:</p>
              <p>۰۹۰۵۲۰۱۸۷۵۱</p>
            </li>
            <li className="flex items-center justify-between">
              <p>ادرس ایمیل:</p>
              <p>amin.ghoreishi86@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-900 rounded-xl p-3 size-22">
              <Image src="/image/logo.png" alt="" width={80} height={60} />
            </div>
            <div className="bg-gray-900 rounded-xl p-3 size-22">
              <Image src="/image/kasbokar.webp" alt="" width={80} height={60} />
            </div>
          </div>
          <FooterTopBtn />
        </div>
      </div>
      <div className="bg-gray-950 dark:bg-gray-900 mt-5 rounded-xl p-5 flex items-center justify-between">
        <div>
          <Link href="/" className="text-3xl font-morabbaReg">
            <span className="text-blue-500">کارین </span>
            <span className="text-white">شاپ</span>
          </Link>
        </div>
        <div className="bg-gray-900 dark:bg-gray-800 p-1.5 rounded-xl w-72 lg:w-87.5 flex items-center justify-between">
          <input
            type="text"
            className="bg-transparent outline-0 text-gray-200 px-2 w-full"
            placeholder="از جدیدترین تخفیف ها با خبر شوید                    "
          />
          <button className="px-4 py-1 text-white  bg-blue-500 rounded-xl">
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
}
