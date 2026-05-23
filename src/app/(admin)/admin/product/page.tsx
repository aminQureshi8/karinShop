import ProductContainer from "@/components/template/admin/Product/ProductContainer";
import { memo } from "react";

const page = memo(async () => {
  return (
    <div>
      <ProductContainer />
    </div>
  );
});

export default page;
