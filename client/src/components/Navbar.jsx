import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    // Logic of the search box
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light px-4">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9896/9896631.png"
          alt="logo"
          width={30}
        />
        Caffinity
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-search">
          <input
            className="form-control me-2Fgrow"
            type="search"
            placeholder="What are you looking for?"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <a className="nav-link " href="#">
              <AiOutlineShoppingCart size={25} />
            </a>
          </div>
          <div className="nav-item mx-2">
            <a className="nav-link" href="#">
              Login
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link border border-dark rounded" href="#">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
