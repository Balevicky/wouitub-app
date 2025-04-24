/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/04/2025 09:11:59
*/
import React, { FC, useEffect } from "react";
import "./Header.css";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {};
    runLocalData();
  });

  return (
    <div className="Header">
      <nav className="navbar navbar-light bg-light shadow-lg">
        {/* <nav className="navbar navbar-light bg-light shadow-lg"> */}
        <div className="container-fluid">
          <a className="navbar-brand">Wouitub</a>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
