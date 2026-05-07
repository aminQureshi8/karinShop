import BreadCrumbs from "@/components/module/BreadCrumbs/BreadCrumbs";
import Footer from "@/components/module/Footer/Footer";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import BlogContent from "./BlogContnt/BlogContent";

export default function BlogContainer({ blog }) {
  return (
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
        <div className="col-span-9">
          <BlogContent title={blog.title} />
        </div>
        <div className="col-span-3">
          
        </div>
      </div>

      <Footer />
    </>
  );
}
