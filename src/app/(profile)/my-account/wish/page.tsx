import WhishCom from "@/components/template/my-account/wish/WishCom";
import db from "@/config/db";
import productModel from "@/models/product";

export default async function page() {
  return (
    <>
      <WhishCom />
    </>
  );
}
