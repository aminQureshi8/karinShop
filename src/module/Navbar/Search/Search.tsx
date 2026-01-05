import { CiSearch } from "react-icons/ci";
function Search() {
  return (
    <div className="relative">
      <input
        type="text"
        className=" rounded-full border-2 p-2 border-gray-200 dark:border-gray-700 pr-12 focus:outline-none focus:border-blue-500"
        placeholder="جستجو در کارین..."
      />
      <div className=" absolute top-1 right-1 ">
        <button className="bg-blue-500 text-white p-2 rounded-full">
          <CiSearch size={20} />
        </button>
      </div>
    </div>
  );
}

export default Search;
