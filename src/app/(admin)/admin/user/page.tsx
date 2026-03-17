import UserContainer from "@/components/template/admin/User/UserContainer/UserContainer";
import db from "@/config/db";
import userModel from "@/models/user";
import "@/models/order";
export default async function page() {
  await db();

  const users = await userModel
    .find({}, "-password -__v -refreshToken")
    .populate("orders")
    .limit(5)
    .lean();

  const totalUsers = await userModel.countDocuments({});
  const totalPages = Math.ceil(totalUsers / 5);

  console.log(users);

  return (
    <div>
      <UserContainer
        users={JSON.parse(JSON.stringify(users))}
        totalPages={totalPages}
      />
    </div>
  );
}
