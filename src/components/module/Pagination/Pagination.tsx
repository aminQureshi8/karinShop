function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}) {
  return (
    <div
      dir="ltr"
      className="flex max-sm:text-xs *:cursor-pointer font-danaMed justify-center items-center gap-2 mt-6"
    >
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-70"
      >
        قبلی
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`px-3 py-1 ss02 rounded ${
            p === currentPage ? "bg-orange-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;
