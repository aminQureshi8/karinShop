
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import db from "@/config/db";
import categoryModel from "@/models/category";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";

export default async function Category() {
  await db();

<<<<<<< HEAD
  const categories = await categoryModel.find({}, "-__v").limit(7).lean();
=======
  const categories = await categoryModel
    .find({}, "imageUrl title")
    .limit(7)
    .lean();
>>>>>>> providersFix

  return (
    <div className="mt-12">
      <TopCategory
        title="دسته بندی های محبوب"
        des="جدیدترین و بروزترین دسته بندی ها"
        icon={<BiCategory size={22} />}
      />

      <div className="grid max-sm:grid-cols-3 grid-cols-7 gap-3 mt-5">
<<<<<<< HEAD
        {categories.map((cat, index) => (
          <div key={cat._id} className={`${index >= 6 ? "max-sm:hidden" : ""}`}>
            <div className="flex justify-center transition-all cursor-pointer hover:grayscale-100">
              <div className="relative w-20 h-20 sm:w-30 sm:h-30">
                <Image
                  src={cat.imageUrl}
                  alt="Category"
                  fill
                  className="object-contain"
                />
              </div>
=======
        {categories.map((cat) => (
          <div key={cat._id}>
            <div className="flex justify-center">
              <Image
                src={cat.imageUrl}
                width={120}
                height={120}
                alt={cat.title}
              />
>>>>>>> providersFix
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
