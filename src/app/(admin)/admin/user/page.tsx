import UserTable from "@/components/template/admin/User/Table/UserTable";
import UserContainer from "@/components/template/admin/User/UserContainer/UserContainer";
import db from "@/config/db";
import userModel from "@/models/user";

export default async function page() {
  await db();

  const users = await userModel.find({}, "-password -__v -refreshToken").lean();

  console.log(users);

  return (
    <div>
      <UserContainer users={users} />
    </div>
  );
}
