import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";

export default function PopPro() {
  return (
    <div className="mt-12">
      <TopCategory
        title="محصولات"
        des="جدیدترین و بروزترین محصولات"
        titleColor="پرفروش"
        icon={<CiMobile3 size={22} />}
      />
      <SwiperProductContainer />
    </div>
  );
}
