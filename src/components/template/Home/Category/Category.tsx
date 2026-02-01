import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import db from "@/config/db";
import categoryModel from "@/models/category";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";

export default async function Category() {
  await db();

  const categories = await categoryModel.find().limit(7).lean();

  return (
    <div className="mt-12">
      <TopCategory
        title="دسته بندی های محبوب"
        des="جدیدترین و بروزترین دسته بندی ها"
        icon={<BiCategory size={22} />}
      />

      <div className="grid grid-cols-7 gap-3 mt-5">
        {categories.map((cat) => (
          <div>
            <div className="flex justify-center">
              <Image
                src={cat.imageUrl}
                width={120}
                height={120}
                alt="Category"
              />
            </div>
            <div>
              <p className="text-center">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
