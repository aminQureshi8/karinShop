import Image from "next/image";

export default function Feature() {
  return (
    <div className="grid grid-cols-5 font-danaMed">
      <div className="flex flex-col items-center">
        <Image src="/image/1.svg" width={50} height={50} alt="fe" />
        <p className="text-sm text-gray-700 dark:text-gray-400">
          امکان تحویل اکسپرس
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/image/2.svg" width={50} height={50} alt="fe" />
        <p className="text-sm text-gray-700 dark:text-gray-400">
          ضمانت اصل بودن کالا
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/image/3.svg" width={50} height={50} alt="fe" />
        <p className="text-sm text-gray-700 dark:text-gray-400">
          ضمانت بازگشت کالا
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/image/4.svg" width={50} height={50} alt="fe" />
        <p className="text-sm ss02 text-gray-700 dark:text-gray-400">
          پشتیبانی 24 ساعته
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/image/5.svg" width={50} height={50} alt="fe" />
        <p className="text-sm text-gray-700 dark:text-gray-400">
          امکان پرداخت در محل
        </p>
      </div>
    </div>
  );
}
