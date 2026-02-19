import { CiDeliveryTruck } from "react-icons/ci";

export default function Badge() {
  return (
    <div className='border border-gray-500 dark:border-gray-700 rounded-lg p-2 dark:text-gray-400 flex items-center gap-2'>
      <CiDeliveryTruck size={20} />
      <p className="text-sm">ارسال به سراسر ایران</p>
    </div>
  )
}
