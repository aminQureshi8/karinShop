import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { FaCertificate } from "react-icons/fa";
import SwiperBlogs from "../SwiperBlogs/SwiperBlogs";
import blogModel from "@/models/blog";
import db from "@/config/db";
import { connection } from "next/server";

export default async function Blog() {
  await db();
  await connection();
  const blogs = await blogModel.find({} , "title coverImage views").lean();
  return (
    <div className="mt-12">
      <TopCategory
        title="محبوب ترین"
        des="جدید ترین و بروز ترین مقالات"
        icon={<FaCertificate size={22} />}
        titleColor="مقالات"
      />
      <SwiperBlogs blogs={blogs} />
    </div>
  );
}
