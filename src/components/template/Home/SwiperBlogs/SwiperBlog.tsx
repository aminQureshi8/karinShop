import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SwiperBlog({ title, coverImage, views, createdAt }) {
  return (
    <div className="bg-white shadow-xl p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed">
      <div className="relative group">
        <Image
          className="rounded-r-4xl rounded-bl-4xl rounded-l-lg"
          width={200}
          height={200}
          src={coverImage}
          alt=""
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-r-4xl rounded-bl-4xl rounded-l-lg">
          <Link
            href=""
            className="flex items-center px-2 py-1 gap-x-1 font-DanaMedium rounded-lg border-2 border-white text-white"
          >
            <p>ادامه مطالب</p>
            <ArrowLeft size={19} />
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <h2>{title}</h2>
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
