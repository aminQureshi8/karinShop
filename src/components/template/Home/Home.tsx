
import Category from "./Category/Category";
import Offs from "./Offs/Offs";
import SwiperBanner from "./SwiperBanner/SwiperBanner";

function HomeCompo() {
  return (
    <div className="container mx-auto mt-12">
      <SwiperBanner/>
      <Category/>
      <Offs/>
    </div>
  );
}

export default HomeCompo;
