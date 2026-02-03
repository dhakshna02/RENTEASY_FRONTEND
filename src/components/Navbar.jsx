import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = ({ onSelectCategory, 
                  onCityChange,
                  searchTerm, 
                  onSearchChange 
 }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // 🌗 THEME
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // 📂 CATEGORY
  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  //   onSelectCategory(category);
  // };
  const handleCategorySelect = (category) => {
  console.log("Clicked category:", category);
  onSelectCategory(category);
};


  // 📍 CITY (ONLY SEND CLEAN VALUE TO HOME)
  const handleCityChange = (e) => {
    const cleanCity = e.target.value.trim(); // 🔑 VERY IMPORTANT
    onCityChange(cleanCity);
  };

  const categories = [
    "sports",
    "Sedan",
    "Suv",
    "Hatchback",
    "Crossover",
    "HyperSports",
  ];

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand">RentEasy</a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Home
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/add_product">
                    Add Product
                  </a>
                </li>

                


                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    🛒 Cart
                  </Link>
                </li>
              </ul>

              {/* 🌗 THEME BUTTON */}
              <button className="theme-btn me-3" onClick={toggleTheme}>
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              {/* 📍 CITY DROPDOWN */}
              <select
                className="form-select me-3"
                style={{ width: "150px" }}
                onChange={handleCityChange}
                defaultValue="Chennai"
              >
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>

              {/* 🔍 SEARCH (UI ONLY, NO API HERE) */}
              <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => {
                        console.log("Navbar search:", e.target.value);
                        onSearchChange(e.target.value);
                      }}
                      style={{ width: "180px", height: "36px" }}
                />

            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
