
import { authUser } from "@/app/utils/auth";

import CheckOut from "@/components/template/Checkout/CheckOut";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await authUser();

  console.log(user);

  if (!user.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto font-danaMed">
      <div className="grid grid-cols-12">
        <div className="max-sm:col-span-12 col-span-8">
          <CheckOut id={user?.user?._id.toString()} />
        </div>
      </div>
    </div>
  );
}
