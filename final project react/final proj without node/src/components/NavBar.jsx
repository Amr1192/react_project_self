import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // استيراد useSelector
import "./Navbar.css";

const Navbar = () => {
  const wishList = useSelector((state) => state.wishList); // جلب الـ Wishlist من Redux
  const wishListCount = wishList.length; // عدد العناصر في الـ Wishlist

  return (
    <nav className="navbar navbar-expand-lg bg-body-dark d-flex align-items-center">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          🎬 MovieApp
        </a>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                Wishlist
                <i className="bi bi-heart-fill ms-2"></i>
                {wishListCount > 0 && (
                  <span className="badge bg-warning rounded-pill ms-1">
                    {wishListCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movies & TV Shows
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tv">
                    Tv Shows
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Language
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Arabic
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tv">
                    Engilsh
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
