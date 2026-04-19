export default function UserNavbarLoading() {
  return (
    <div className="border-2 text-sm px-3 flex items-center gap-x-2 border-gray-200 dark:border-gray-700 rounded-full p-2 animate-pulse">
      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
    </div>
  );
}
