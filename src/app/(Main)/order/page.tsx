import { authUser } from "@/app/utils/auth";
import BreadCrumbs from "@/components/module/BreadCrumbs/BreadCrumbs";
import CartOrder from "@/components/template/Order/CartOrder";
import ProductOrder from "@/components/template/Order/ProductOrder";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
export default async function page() {
  const user = await authUser();

  return (
    <div className="container mx-auto">
      <div className="my-8">
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
        </BreadCrumbs>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="max-sm:col-span-12 col-span-9">
          <ProductOrder />
        </div>
        <div className="max-sm:col-span-12 col-span-3">
          <CartOrder isUserLogin={user.user ? true : false} />
        </div>
      </div>
    </div>
  );
}
