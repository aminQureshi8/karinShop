import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen font-danaMed flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <div>
          <p className="ss02 text-4xl text-center">404</p>
          <p className="text-sm mt-4">صحفه یافت نشد</p>
        </div>
        <div>
          <p className="text-sm mb-4">
            صفحه‌ای که دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-blue-500 text-sm text-white p-2 rounded-lg cursor-pointer"
            >
              بازگشت به صحفه اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
