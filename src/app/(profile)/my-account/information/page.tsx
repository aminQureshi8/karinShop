import { authUser } from "@/app/utils/auth";
import Information from "@/components/template/my-account/information/Information";

export default async function page() {
  const user = await authUser();

  return (
    <>
      <Information email={user?.user?.email} id={user?.user?._id} />
    </>
  );
}
