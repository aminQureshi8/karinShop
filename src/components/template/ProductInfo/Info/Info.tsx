import Badge from "./Badge/Badge";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import Gallery from "./Gallery/Gallery";
import InformationProduct from "./InformationProduct/InformationProduct";

export default function Info({ images, colors, features }: any) {
  return (
    <div>
      <div>
        <BreadCrumbs />
      </div>

      <div className="mt-10 rounded-lg shadow-md bg-white dark:bg-gray-800 pl-3 pt-3 pb-3">

        <div className="grid grid-cols-12">
          <div className="max-sm:col-span-12 col-span-4">
            <Gallery images={images} />
          </div>
          <div className="max-sm:col-span-12 col-span-8">
            <InformationProduct colors={colors} features={features} />
          </div>
        </div>

        <div className="grid grid-cols-4 pr-3 mt-5 gap-3">
          <Badge />
          <Badge />

          <Badge />

          <Badge />

        </div>
      </div>


    </div>
  );
}
