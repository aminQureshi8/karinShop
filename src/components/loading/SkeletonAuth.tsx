export default function SkeletonAuth() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center animate-pulse">
      <div className="rounded-2xl w-96 border border-white/20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl shadow-lg flex flex-col justify-center py-5">
        <div className="flex justify-end pl-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700"></div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-24 h-8 rounded-md bg-gray-200 dark:bg-slate-700"></div>
        </div>

        <div className="pr-8 mb-6">
          <div className="w-24 h-4 rounded-md bg-gray-200 dark:bg-slate-700"></div>
        </div>

        <div className="px-8 space-y-3">
          <div className="w-32 h-3 rounded-md bg-gray-200 dark:bg-slate-700"></div>
          <div className="w-full h-12 rounded-xl bg-gray-200 dark:bg-slate-700"></div>

          <div className="w-full h-12 rounded-xl bg-gray-200 dark:bg-slate-700 mt-4"></div>
        </div>

        <div className="text-center mt-10 px-10">
          <div className="w-full h-4 rounded-md bg-gray-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}
