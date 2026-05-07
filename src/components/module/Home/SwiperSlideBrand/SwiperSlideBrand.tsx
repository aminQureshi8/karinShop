import Image from "next/image";

export default function SwiperSlideBrand({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl px-4">
      <Image
        alt={title}
        src={imageUrl || "/image/asus.png"}
        width={150}
        height={150}
        className="h-25!"
      />
    </div>
  );
}
