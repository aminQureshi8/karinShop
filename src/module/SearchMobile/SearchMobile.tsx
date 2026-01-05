import { CiSearch } from "react-icons/ci";

function SearchMobile() {
  return (
    <div className="lg:hidden container mx-auto mt-5">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-full flex items-center gap-3 w-full py-3 pr-3">
        <CiSearch size={19} />
        <p className="text-sm">جستجو در کارین</p>
      </div>
    </div>
  );
}

export default SearchMobile;
