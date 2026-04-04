import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function BreadCrumbs() {
  return (
    <div className="flex items-center max-sm:text-sm gap-2">
      <Link href="/" className="flex items-center gap-2">
        <BiHome />
        <p>صحفه اصلی</p>
      </Link>
      <div>
        <MdKeyboardArrowLeft />
      </div>
      <Link href="/shop" className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <p>فروشگاه</p>
      </Link>
      <div>
        <MdKeyboardArrowLeft />
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <p>جزییات محصول</p>
      </div>
    </div>
  );
}
