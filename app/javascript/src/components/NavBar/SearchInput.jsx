import React from "react";

const SearchInput = () => (
  <div className="flex items-center p-4">
    <input
      className="focus:outline-none w-80 rounded-lg border border-gray-300 px-4 py-2"
      placeholder="Search"
      type="text"
    />
    <button className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
      Search
    </button>
  </div>
);

export default SearchInput;
