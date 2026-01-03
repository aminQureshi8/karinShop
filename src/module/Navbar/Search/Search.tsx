import { CiSearch } from "react-icons/ci";
function Search() {
  return (
    <div className="relative">
      <input
        type="text"
        className=" rounded-full border-2 p-2 border-gray-200"
        placeholder="جستجو در کارین..."
      />
      <div className=" absolute top-1.5 right-2 ">
        <button>
          <CiSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;
