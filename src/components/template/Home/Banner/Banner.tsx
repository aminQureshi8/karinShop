import Image from "next/image";

export default function Banner() {
  return (
    <div className="mt-12">
      <div className="grid max-sm:grid-cols-1 grid-cols-2  gap-5">
        <div>
          <Image
            className="rounded-xl"
            width={800}
            height={200}
            alt="s"
            src="/image/1.webp"
          />
        </div>
        <div>
          <Image
            className="rounded-xl"
            width={800}
            height={200}
            alt="s"
            src="/image/1.webp"
          />
        </div>
      </div>
    </div>
  );
}
