
import Banner from "./Banner/Banner";
import Brand from "./Brand/Brand";
import Category from "./Category/Category";
import NewProduct from "./NewProduct/NewProduct";
import Offs from "./Offs/Offs";
import PopPro from "./PopPro/PopPro";
import SwiperBanner from "./SwiperBanner/SwiperBanner";

function HomeCompo() {
  return (
    <div className="container mx-auto mt-12">
      <SwiperBanner/>
      <Category/>
      <Offs/>
      <NewProduct/>
      <Banner/>
      <PopPro/>
      <Brand/>
    </div>
  );
}

export default HomeCompo;
