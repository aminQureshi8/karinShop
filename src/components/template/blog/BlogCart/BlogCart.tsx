import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCart({ newBlogs }) {
  return (
    <div className="bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <div>
        <h2>جدید ترین مقالات:</h2>
      </div>

      <div className="mt-5 space-y-3">
        {newBlogs.map((blog, index) => (
          <div key={index}>
            <Link
              href={blog.slug}
              key={blog.id}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                <Image
                  src={blog.coverImage}
                  width={70}
                  height={70}
                  alt={blog.title}
                  className="rounded-lg object-cover w-[70px] h-[70px]"
                />
              </div>

              <div>
                <p className="line-clamp-2 text-sm">{blog.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button className="flex items-center text-sm gap-2 bg-blue-500 text-white w-full justify-center p-2 rounded-lg cursor-pointer">
          <span>مشاهده بیشتر</span>
          <ArrowLeftIcon size={18} />
        </button>
      </div>
    </div>
  );
}
