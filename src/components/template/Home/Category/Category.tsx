import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import db from "@/config/db";
import categoryModel from "@/models/category";
import Image from "next/image";
import { connection } from "next/server";
import { BiCategory } from "react-icons/bi";

export default async function Category() {
  await connection();
  await db();

  const categories = await categoryModel
    .find({}, "imageUrl title")
    .limit(7)
    .lean();

  return (
    <div className="mt-12">
      <TopCategory
       title="دسته بندی های"
       titleColor="محبوب"
        des="جدیدترین و بروزترین دسته بندی ها"
        icon={<BiCategory size={22} />}
      />

      <div className="grid max-sm:grid-cols-3 grid-cols-7 gap-3 mt-5">
        {categories.map((cat) => (
          <div key={cat._id}>
            <div className="flex justify-center">
              <Image
                src={cat.imageUrl}
                width={120}
                height={120}
                alt={cat.title}
              />
            </div>

            <div>
              <p className="text-center max-md:text-sm">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
