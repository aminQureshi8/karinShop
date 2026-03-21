import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
function Home() {
  return (
    <div>
      <div className="grid max-md:grid-cols-1 grid-cols-3 gap-2">
        <div className="bg-white shadow-md dark:bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
        <div className="bg-white shadow-md dark:bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
        <div className="bg-white shadow-md dark:bg-slate-800 rounded-lg flex items-center gap-3 p-3">
          <div>
            <FaCreditCard size={20} className="text-blue-500" />
          </div>
          <div>
            <h2>کیف پول</h2>
            <p className="text-gray-500">موجودی: ۰ تومان</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md mt-5 dark:bg-slate-800 rounded-lg  p-3">
        <div className="flex items-center gap-3">
          <FaCartArrowDown size={20} className="text-green-500" />
          <p>سفارش های اخیر: </p>
        </div>

        <div className="mt-5">
          <div className="relative overflow-x-auto bg-neutral-primary-soft rounded-lg shadow-xs rounded-base border border-gray-200 dark:border-gray-700 border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    نام محصول
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    تاریخ
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    قیمت
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    وضیعت
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src="/image/lap.png"
                          width={50}
                          height={50}
                          alt="product"
                        />
                      </div>
                      <p>محصول</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">1404/3/2</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-neutral-primary">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
