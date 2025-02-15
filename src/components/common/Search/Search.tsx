import React, { useState, ChangeEvent } from "react";
import  "./Search.css";
import { Button } from "../../common";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  showSearchButton?: boolean;
  searchButtonText?: string;
  className?: string;
}

const Search = ({
  placeholder = "Поиск...",
  onSearch,
  showSearchButton = true,
  searchButtonText = "Найти",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  return (
    <div className={`search ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
      {showSearchButton && (
        <Button onClick={() => onSearch(query)}>{searchButtonText}</Button>
      )}
    </div>
  );
};

export default Search;
