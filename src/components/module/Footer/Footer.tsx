import React from "react";
import FooterTopBtn from "./FooterTopBtn";

export default function Footer() {
  return (
    <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-5 mb-12">
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div>
          <h2 className="text-white">درباره کارین شاپ</h2>
          <p className="text-gray-300 mt-5 text-sm">
            در فروشگاه آنلاین ما، بهترین مدل‌های موبایل و لپ‌تاپ از برندهای
            معتبر جهانی را با کیفیت بالا و قیمتی مناسب برای شما فراهم آورده‌ایم.
            با انتخاب محصولات ما، تجربه‌ای حرفه‌ای و لذت‌بخش از فناوری را در
            خانه یا محل کار داشته باشید.
          </p>
        </div>
        <div>
          <h2 className="text-white">دسترسی سریع</h2>
          <ul className="text-gray-300 flex flex-col gap-5 text-sm mt-5">
            <li>صحفه اصلی</li>
            <li>فروشگاه</li>
            <li>تماس با ما</li>
            <li>سوالات متداول</li>
          </ul>
        </div>
        <div>
          <h2 className="text-white">تماس با ما</h2>
          <ul className="text-gray-300 mt-5 text-sm">
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
    </div>
  );
}
