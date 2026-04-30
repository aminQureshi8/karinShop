import BreadCrumbs from "./BreadCrumbs";
import CheckOutForm from "./Form/CheckOutForm";
import LaconicProduct from "./LaconicProduct";

export default function CheckOut({ id, post, setPost }: { id: string }) {
  return (
    <div className="mt-8">
      <BreadCrumbs />
      <CheckOutForm id={id} post={post} setPost={setPost} />
      <LaconicProduct />
    </div>
  );
}
