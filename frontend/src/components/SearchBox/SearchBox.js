import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SearchBox.scss";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  function searchQuery(event) {
    navigate(`/items?search=${query}`);
    event.preventDefault();
  }

  return (
    <form className="search-box-form" role="search" onSubmit={searchQuery}>
      <input
        type="text"
        className="search-box-input"
        placeholder="Nunca dejes de buscar"
        maxLength="120"
        tabIndex="2"
        onChange={event => setQuery(event.target.value)}
      />
      <button type="submit" className="search-box-btn" tabIndex="3" />
    </form>
  );
}
