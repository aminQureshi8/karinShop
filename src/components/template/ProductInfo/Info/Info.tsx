import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import Gallery from "./Gallery/Gallery";
import InformationProduct from "./InformationProduct/InformationProduct";

export default function Info({ images }: any) {
  return (
    <div>
      <div>
        <BreadCrumbs />
      </div>

      <div className="grid grid-cols-12 mt-10 rounded-lg dark:bg-gray-800 p-3">
        <div className="col-span-4">
          <Gallery images={images}  />
        </div> 
        <div className="col-span-8">
          <InformationProduct  />
        </div>
      </div>
    </div>
  );
}
