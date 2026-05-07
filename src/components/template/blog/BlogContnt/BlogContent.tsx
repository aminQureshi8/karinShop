import Image from "next/image";

export default function BlogContent({
  title,
  img,
  category,
  author,
  createdAt,
  content,
  excerpt,
}) {
  return (
    <div className="bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <h1 className="font-semibold text-2xl pt-3">{title}</h1>

      <div className="mt-3 flex items-center gap-5 max-sm:text-xs">
        <div className="flex items-center gap-1">
          <p>دسته بندی:</p>
          <p>{category}</p>
        </div>
        <div className="flex items-center gap-1">
          <p>نویسنده:</p>
          <p>{author}</p>
        </div>
        <div className="flex items-center gap-1">
          <p>تاریخ:</p>
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        </div>
      </div>

      <div className="w-full mt-8">
        <div className="relative w-full max-sm:h-[300px] h-[600px]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-containe rounded-xl"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
