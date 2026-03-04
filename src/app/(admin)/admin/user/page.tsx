import UserTable from "@/components/template/admin/User/Table/UserTable";
import UserContainer from "@/components/template/admin/User/UserContainer/UserContainer";
import db from "@/config/db";
import userModel from "@/models/user";

export default async function page() {
  await db();

  const users = await userModel
    .find({}, "-password -__v -refreshToken")
    .limit(5)
    .lean();

  const totalUsers = await userModel.countDocuments({});
  const totalPages = Math.ceil(totalUsers / 5);



  return (
    <div>
      <UserContainer users={JSON.parse(JSON.stringify(users))} totalPages={totalPages}  />
    </div>
  );
}
