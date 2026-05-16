const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen text-white" dir="ltr">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 justify-end mb-8">
        <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse"></div>
        <span className="text-gray-600">‹</span>
        <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse"></div>
        <span className="text-gray-600">‹</span>
        <div className="h-4 w-28 bg-gray-700/50 rounded animate-pulse"></div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">

        {/* MAIN CONTENT — goes FIRST on mobile */}
        <div className="flex-1 w-full order-1 md:order-none" dir="rtl">
          <div className="bg-[#1a2332] rounded-2xl p-6 md:p-8">

            <div className="flex flex-col md:flex-row gap-8">

              {/* Image Section */}
              <div className="shrink-0 order-last md:order-none mx-auto md:mx-0">
                <div className="h-64 w-48 sm:h-80 sm:w-64 bg-gray-700/50 rounded-2xl animate-pulse"></div>

                <div className="flex gap-3 mt-4 justify-center md:justify-end">
                  <div className="h-20 w-20 bg-gray-700/50 rounded-xl animate-pulse"></div>
                  <div className="h-20 w-20 bg-gray-700/50 rounded-xl animate-pulse"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-6">

                <div className="flex gap-3 justify-end">
                  <div className="h-11 w-11 bg-gray-700/50 rounded-xl animate-pulse"></div>
                  <div className="h-11 w-11 bg-gray-700/50 rounded-xl animate-pulse"></div>
                </div>

                <div className="space-y-3 text-right">
                  <div className="flex justify-end">
                    <div className="h-7 w-full bg-gray-700/50 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-start">
                    <div className="h-5 w-3/4 bg-gray-700/50 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-start">
                  <div className="h-10 w-10 bg-blue-500/30 rounded-full animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-700/50 rounded animate-pulse"></div>
                </div>

                {/* Grid 1 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-[#0f1621] rounded-xl p-4 text-center space-y-2">
                      <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse mx-auto"></div>
                      <div className="h-6 w-12 bg-gray-700/50 rounded animate-pulse mx-auto"></div>
                    </div>
                  ))}
                </div>

                {/* Grid 2 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-[#0f1621] rounded-xl animate-pulse"></div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR — goes AFTER main content on mobile */}
        <div className="w-full md:w-80 shrink-0 order-2 md:order-first">
          <div className="bg-[#1a2332] rounded-2xl p-6 space-y-5">

            <div className="flex justify-start">
              <div className="h-8 w-48 bg-gray-700/50 rounded animate-pulse"></div>
            </div>

            <div className="bg-[#0f1621] rounded-xl p-3 flex items-center justify-between">
              <div className="h-8 w-8 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-6 w-12 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-700/50 rounded animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-5 w-32 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse"></div>
            </div>

            <div className="flex justify-start">
              <div className="h-4 w-40 bg-gray-700/50 rounded animate-pulse"></div>
            </div>

            <div className="h-14 w-full bg-blue-600/30 rounded-xl animate-pulse"></div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
