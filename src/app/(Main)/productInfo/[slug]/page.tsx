import { Suspense } from "react";
import ProductContent from "../../../../components/template/ProductInfo/ProductContent";
import Loading from "./LoadingPage";

export default async function page({ params }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <Suspense fallback={<Loading />}>
        <ProductContent slug={slug} />
      </Suspense>
    </div>
  );
}
