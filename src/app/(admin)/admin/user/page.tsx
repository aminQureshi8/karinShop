import UserTable from "@/components/template/admin/User/UserTable";
import db from "@/config/db";
import userModel from "@/models/user";

export default async function page() {
  await db();

  const users = await userModel.find({}, "-password -__v -refreshToken").lean();

  console.log(users);

  return (
    <div>
      <UserTable users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}
