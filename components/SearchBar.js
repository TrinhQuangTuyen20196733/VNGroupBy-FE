import React, { useState } from "react";
import { Search } from "@mui/icons-material";

const SearchBar = ({ width }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // Xử lý tìm kiếm dữ liệu tại đây
    console.log(searchTerm);
  };
  const inputStyles = {
    width: width || "80%",
  };

  return (
    <div className="relative " style={inputStyles}>
      <input
        type="text"
        placeholder="Search something"
        className={`outline-none border rounded-xl p-2 pl-8 ${
          isFocused ? "border-blue-900" : "border-gray-300"
        } ${
          isFocused ? "hover:border-blue-900" : "hover:border-gray-400"
        } w-full`}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="absolute top-2 right-2 ">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
