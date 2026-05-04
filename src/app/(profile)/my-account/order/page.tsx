import { authUser } from "@/app/utils/auth";
import TableOrder from "@/components/template/my-account/order/TableOrder";

export default async function page() {
  const user = await authUser();

  return (
    <div>
      <TableOrder id={user?.user?._id} />
    </div>
  );
}
