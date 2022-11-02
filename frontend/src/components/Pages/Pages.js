import React from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import ProductView from "../../views/Product";
import SearchView from "../../views/Search";

export function Pages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search")

  return (
      <Routes>
        <Route exact path="/items" element={<SearchView search={search} />} />
        <Route path="/items/:id" element={<ProductView />} />
      </Routes>
  );
}
