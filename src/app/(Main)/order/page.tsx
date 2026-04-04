import Providers from "@/app/redux/Providers";
import { authUser } from "@/app/utils/auth";
import CartOrder from "@/components/template/Order/CartOrder";
import ProductOrder from "@/components/template/Order/ProductOrder";

export default async function page() {
  const user = await authUser();

  return (
    <div className="container mx-auto">
      <div className="my-8"></div>
      <div className="grid grid-cols-12 gap-5">
        <div className="max-sm:col-span-12 col-span-9">
          <ProductOrder />
        </div>
        <div className="max-sm:col-span-12 col-span-3">
          <Providers>
            <CartOrder isUserLogin={user.user ? true : false} />
          </Providers>
        </div>
      </div>
    </div>
  );
}
