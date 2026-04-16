import { Suspense } from "react";
import ProductContent from "../../../../components/template/ProductInfo/ProductContent";
import { BeatLoader } from "react-spinners";
import ProductSkeleton from "./ProductSkeleton";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent id={id} />
      </Suspense>
    </div>
  );
}
