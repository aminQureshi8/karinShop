import db from "@/config/db";
import blogModel from "@/models/blog";
import { connection } from "next/server";
import BreadCrumbs from "@/components/module/BreadCrumbs/BreadCrumbs";
import Footer from "@/components/module/Footer/Footer";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import BlogContent from "@/components/template/blog/BlogContnt/BlogContent";
import BlogCart from "@/components/template/blog/BlogCart/BlogCart";

export default async function page({ params }) {
  await connection();
  await db();
  const { slug } = await params;

  const blog = await blogModel
    .findOne({ slug })
    .populate("category", "title")
    .lean();

  const newBlogs = await blogModel
    .find(
      {
        slug: {
          $ne: slug,
        },
      },
      "title coverImage",
    )
    .sort({ createdAt: -1 })
    .limit(4);

  return (
    <div className="container mx-auto">
      <>
        <div className="mt-8">
          <BreadCrumbs>
            <Link href="/" className="flex items-center gap-2">
              <BiHome />
              <p>صحفه اصلی</p>
            </Link>
            <div>
              <MdKeyboardArrowLeft />
            </div>
            <Link
              href="/order"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <p>مقالات</p>
            </Link>
            <div>
              <MdKeyboardArrowLeft />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <p>جزییات مقاله</p>
            </div>
          </BreadCrumbs>
        </div>

        <div className="grid grid-cols-12 mt-8">
          <div className="max-md:col-span-12 col-span-9">
            <BlogContent
              title={blog.title}
              img={blog.coverImage}
              category={JSON.parse(JSON.stringify(blog.category.title))}
              author={blog.author}
              createdAt={blog.createdAt}
              content={blog.content}
              excerpt={blog.excerpt}
            />
          </div>
          <div className="max-md:col-span-12 col-span-3">
            <BlogCart newBlogs={newBlogs} />
          </div>
        </div>

        <Footer />
      </>
    </div>
  );
}
