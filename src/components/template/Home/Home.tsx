import Footer from "@/components/module/Footer/Footer";
import Banner from "./Banner/Banner";
import Brand from "./Brand/Brand";
import Category from "./Category/Category";
import Feature from "./Feature/Feature";
import Hot from "./Hot/Hot";
import NewProduct from "./NewProduct/NewProduct";
import Offs from "./Offs/Offs";
import PopPro from "./PopPro/PopPro";
import SwiperBanner from "./SwiperBanner/SwiperBanner";
import Blog from "./Blog/Blog";
import { Suspense } from "react";
import CategorySkeleton from "@/components/loading/SkeletonCategory";
import SwiperProductSkeleton from "@/components/loading/SkeletonSwiperProduct";
import SkeletonTopCategory from "@/components/loading/SkeletonTopCategory";
import SkeletonOffSwiper from "@/components/loading/SkeletonOffSwiper";
import SkeletonSwiperBanner from "@/components/loading/SkeletonSwiperBanner";
import SkeletonSwiperBlogs from "@/components/loading/SkeletonSwiperBlogs";
import SkeletonSwiperBrands from "@/components/loading/SkeletonSwiperBrands";

function HomeCompo() {
  return (
    <div className="container mx-auto max-sm:mt-6 mt-12">
      <Suspense fallback={<SkeletonSwiperBanner />}>
        <SwiperBanner />
      </Suspense>
      <Suspense fallback={<CategorySkeleton />}>
        <Category />
      </Suspense>
      <Suspense fallback={<SkeletonOffSwiper />}>
        <Offs />
      </Suspense>
      <Suspense
        fallback={
          <>
            <SkeletonTopCategory />
            <SwiperProductSkeleton />
          </>
        }
      >
        <NewProduct />
      </Suspense>
      <Banner />
      <Suspense
        fallback={
          <>
            <SkeletonTopCategory />
            <SwiperProductSkeleton />
          </>
        }
      >
        <PopPro />
      </Suspense>
      <Suspense
        fallback={
          <>
            <SkeletonTopCategory />
            <SkeletonSwiperBrands />
          </>
        }
      >
        <Brand />
      </Suspense>
      <Hot />
      <Suspense
        fallback={
          <>
            <SkeletonTopCategory />
            <SkeletonSwiperBlogs />
          </>
        }
      >
        <Blog />
      </Suspense>
      <Feature />
      <Footer />
    </div>
  );
}

export default HomeCompo;
