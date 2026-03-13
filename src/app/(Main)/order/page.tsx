import { authUser } from "@/app/utils/auth";
import CartOrder from "@/components/template/Order/CartOrder";
import ProductOrder from "@/components/template/Order/ProductOrder";

export default async function page() {
  const user = await authUser();

  console.log(user.user);

  return (
    <div className="container mx-auto">
      <div className="my-8"></div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <ProductOrder />
        </div>
        <div className="col-span-3">
          <CartOrder isUserLogin={user.user ? true : false} />
        </div>
      </div>
    </div>
  );
}
