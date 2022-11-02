import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductView from "../../views/Product";
import SearchView from "../../views/Search";

export function Pages() {
  const search = useLocation().search;

  return (
      <Routes>
        <Route exact path="/items" element={<SearchView search={search} />} />
        <Route path="/items/:id" element={<ProductView />} />
      </Routes>
  );
}
