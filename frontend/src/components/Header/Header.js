import React from "react";
import "./Header.scss";
import SearchBox from "../SearchBox";

export function Header() {
  return (
    <header>
      <img
        alt="Mercado Libre"
        className="header-logo"
        src={require('../../assets/Logo_ML.png')}
      />
      <SearchBox />
    </header>
  );
}
