import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CheckOutContainer from "@/components/template/Checkout/CheckOutContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user.user) {
    redirect("/");
  }

  return (
    <>
      <CheckOutContainer id={user?.user?._id.toString()} />
    </>
  );
}
