import { authUser } from "@/app/utils/auth";
import CheckOutContainer from "@/components/template/Checkout/CheckOutContainer";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await authUser();

  if (!user.user) {
    redirect("/");
  }

  return (
    <>
      <CheckOutContainer id={user?.user?._id.toString()} />
    </>
  );
}
