
import Category from "./Category/Category";
import SwiperBanner from "./SwiperBanner/SwiperBanner";

function HomeCompo() {
  return (
    <div className="container mx-auto mt-8">
      <SwiperBanner/>
      <Category/>
    </div>
  );
}

export default HomeCompo;
