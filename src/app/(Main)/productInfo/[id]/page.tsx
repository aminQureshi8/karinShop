import { Suspense } from "react";
import ProductContent from "../../../../components/template/ProductInfo/ProductContent";
import Loading from "./LoadingPage";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <Suspense fallback={<Loading />}>
        <ProductContent id={id} />
      </Suspense>
    </div>
  );
}
