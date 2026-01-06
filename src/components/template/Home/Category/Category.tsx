import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";

export default function Category() {
  return (
    <div className="mt-5">
      <TopCategory
        title="دسته بندی های محبوب"
        des="جدیدترین و بروزترین دسته بندی ها"
        icon={<BiCategory size={22} />}
      />

      <div className="grid grid-cols-7 gap-3 mt-5">
        <div>
          <div className="flex justify-center">
            <Image
              src="/image/9 (1).png"
              width={120}
              height={120}
              alt="Category"
            />
          </div>
          <div>
            <p className="text-center">موبایل</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
