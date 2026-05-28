import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TableOrder from "@/components/template/my-account/order/TableOrder";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  return (
    <div>
      <TableOrder id={user?.user?._id} />
    </div>
  );
}
