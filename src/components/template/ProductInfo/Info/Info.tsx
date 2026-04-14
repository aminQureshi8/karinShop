import { CiDeliveryTruck } from "react-icons/ci";
import Badge from "./Badge/Badge";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import Gallery from "./Gallery/Gallery";
import InformationProduct from "./InformationProduct/InformationProduct";
import { memo } from "react";

const Info = memo(
  ({
    images,
    colors,
    features,
    price,
    title,
    id,
    mainCount,
    breadCrumbs,
    mainImage
  }: any) => {
    return (
      <div>
        <div>
          <BreadCrumbs />
        </div>

        <div className="mt-10 rounded-lg shadow-md bg-white dark:bg-gray-800 pl-3 pt-3 pb-3">
          <div className="grid grid-cols-12 gap-5">
            <div className="max-md:col-span-12 col-span-4">
              <Gallery images={images} mainImage={mainImage} />
            </div>
            <div className="max-md:col-span-12 col-span-8">
              <InformationProduct
                colors={colors}
                breadCrumbs={breadCrumbs}
                features={features}
                price={price}
                title={title}
                id={id}
                imageUrls={images[0]}
                mainCount={mainCount}
              />
            </div>
          </div>

          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-4 pr-3 mt-5 gap-3">
            <Badge title="پشتیبانی کل هفته" icon={<CiDeliveryTruck />} />
            <Badge title="ارسال به سرار ایران" icon={<CiDeliveryTruck />} />
            <Badge title="تضمین اصالت کالا" icon={<CiDeliveryTruck />} />
            <Badge title="ضمانت بازگشت کالا" icon={<CiDeliveryTruck />} />
          </div>
        </div>
      </div>
    );
  },
);

export default Info;
