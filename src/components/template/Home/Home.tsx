
import Category from "./Category/Category";
import NewProduct from "./NewProduct/NewProduct";
import Offs from "./Offs/Offs";
import SwiperBanner from "./SwiperBanner/SwiperBanner";

function HomeCompo() {
  return (
    <div className="container mx-auto mt-12">
      <SwiperBanner/>
      <Category/>
      <Offs/>
      <NewProduct/>
    </div>
  );
}

export default HomeCompo;
