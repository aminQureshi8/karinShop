import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href="/" className=" text-3xl font-morabbaReg">
       <span className="text-blue-500">کارین </span>
       <span>شاپ</span>
       <p className="text-sm text-center mt-1 dark:text-gray-400 max-md:hidden">خرید موبایل و لپ تاپ</p>
      </Link>
    </div>
  );
}

export default Logo;
