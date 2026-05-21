
import "@/models/order";
import UserTable from "@/components/template/admin/User/Table/UserTable";
export default async function page() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
