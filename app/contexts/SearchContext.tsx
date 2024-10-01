"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type SearchContextValue = {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
};
const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <SearchContext.Provider value={{ searchVal, setSearchVal }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchValue = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("Search Context must be used within SearchContextProvider");
  }

  return context;
};
