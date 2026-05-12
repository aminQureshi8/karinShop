import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SwiperBlog({
  title,
  coverImage,
  views,
  createdAt,
  slug,
}) {
  return (
    <div className="bg-white p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed  shadow-[0_4px_16px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.12)] dark:shadow-[0_4px_16px_rgb(0,0,0,0.3)] dark:hover:shadow-[0_8px_24px_rgb(0,0,0,0.4)] dark:hover:shadow-[0_20px_60px_rgb(0,0,0,0.5)] transition-shadow duration-300">
      <div className="relative group w-full h-48">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover rounded-r-4xl rounded-bl-4xl rounded-l-lg"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-r-4xl rounded-bl-4xl rounded-l-lg">
          <Link
            href={`/blog/${slug}`}
            className="flex items-center px-2 py-1 gap-x-1 font-DanaMedium rounded-lg border-2 border-white text-white"
          >
            <p>ادامه مطالب</p>
            <ArrowLeft size={19} />
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="line-clamp-1">{title}</h2>
      </div>

      <div className="border-t flex items-center justify-between pt-3 mt-3">
        <div className="text-blue-500 dark:text-sky-400">
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        </div>
        <div className="flex ss02 items-center gap-1 text-gray-300">
          <p>{views}</p>
          <Eye size={19} />
        </div>
      </div>
    </div>
  );
}
