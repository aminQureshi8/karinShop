import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
export default function NewProduct() {
  return (
    <div className="mt-12">
      <TopCategory
        title="جدید ترین محصولات"
        des="جدیدترین و بروزترین محصولات"
        icon={<CiMobile3 size={22} />}
      />
      <SwiperProductContainer/>
    </div>
  );
}
