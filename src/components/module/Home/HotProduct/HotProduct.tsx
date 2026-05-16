import Image from "next/image";
import Link from "next/link";

export default function HotProduct({
  title,
  mainImage,
  slug
}: {
  title: string;
  mainImage: string;
}) {
  return (
    <Link href={`/productInfo/${slug}`} className="flex items-center gap-3 text-sm ">
      <div>
        <Image src={mainImage} width={100} height={100} alt={title} />
      </div>
      <div>
        <p className="line-clamp-1">{title}</p>
      </div>
    </Link>
  );
}
