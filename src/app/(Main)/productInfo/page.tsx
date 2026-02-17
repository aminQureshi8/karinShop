import Cart from "@/components/template/ProductInfo/Cart/Cart";
import Info from "@/components/template/ProductInfo/Info/Info";

export default function page() {
  return (
    <div className="container mx-auto mt-12 font-danaMed">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <Info />
        </div>
        <div className="col-span-3">
          <Cart />
        </div>
      </div>
    </div>
  );
}
