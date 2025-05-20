/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/04/2025 09:11:59
*/
import React, { FC, useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = currentSearchParams.get("searchVideo") || "";
  const [searchInput, setSearchInput] = useState<string>(searchQuery);
  console.log(searchQuery);

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      setSearchInput(searchQuery);
    };
    runLocalData();
  }, []);

  // const handleNotif = () => {};

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("searchVideo", searchInput);
    navigate({ search: currentSearchParams.toString() });
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
        {/* <nav className="navbar navbar-light bg-light shadow-lg"> */}
        <div className="container-fluid">
          <Link to="/" className="d-flex gap-2 align-items-center">
            <div className="logo">
              <img src="/logo192.png" width={30} alt="logo192" />
            </div>
            <span className="navbar-brand">
              <strong>Wouitub</strong>
            </span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  Account
                </Link>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                defaultValue={searchInput}
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

          {/* <button
            // onClick={handleNotif}
            className="btn btn-outline-success"
            type="submit"
          >
            Add notif
          </button> */}

          {/* =========== */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
