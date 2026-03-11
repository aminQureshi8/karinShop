import CartOrder from "@/components/template/Order/CartOrder";
import ProductOrder from "@/components/template/Order/ProductOrder";

export default function page() {
  return (
    <div className="container mx-auto">
      <div className="my-8"></div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <ProductOrder />
        </div>
        <div className="col-span-3">
          <CartOrder />
        </div>
      </div>
    </div>
  );
}
