import BreadCrumbs from "@/components/module/BreadCrumbs/BreadCrumbs";
import CheckOutForm from "./Form/CheckOutForm";
import LaconicProduct from "./LaconicProduct";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
export default function CheckOut({ id, post, setPost , setIsLoading }: { id: string }) {
  return (
    <div className="mt-8">
      <BreadCrumbs>
        <Link href="/" className="flex items-center gap-2">
          <BiHome />
          <p>صحفه اصلی</p>
        </Link>
        <div>
          <MdKeyboardArrowLeft />
        </div>
        <Link
          href="/order"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
        >
          <p>سبد خرید</p>
        </Link>
        <div>
          <MdKeyboardArrowLeft />
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <p>ادرس و زمان ارسال</p>
        </div>
      </BreadCrumbs>
      <CheckOutForm id={id} post={post} setPost={setPost} setIsLoading={setIsLoading} />
      <LaconicProduct />
    </div>
  );
}
