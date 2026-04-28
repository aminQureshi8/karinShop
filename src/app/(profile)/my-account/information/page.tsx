import { authUser } from "@/app/utils/auth";
import Information from "@/components/template/my-account/information/Information";
import userModel from "@/models/user";

export default async function page() {
  const user = await authUser();

  const userFind = await userModel.findOne(
    { _id: user?.user?._id },
    "name phone dateTime",
  );

  return (
    <>
      <Information
        name={userFind?.name}
        dateTime={userFind?.dateTime}
        phone={userFind?.phone}
        email={user?.user?.email}
        id={user?.user?._id}
      />
    </>
  );
}
