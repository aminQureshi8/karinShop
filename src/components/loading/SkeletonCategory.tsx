export default function CategorySkeleton() {
  return (
    <div className="mt-12 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-5 w-40 bg-gray-300 dark:bg-slate-700 rounded"></div>
      </div>

      <div className="grid max-sm:grid-cols-3 grid-cols-7 gap-3 mt-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>
            <div className="flex justify-center">
              <div className="w-[120px] h-[120px] bg-gray-300 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="mt-2">
              <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
