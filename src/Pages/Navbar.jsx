import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [theme, setTheme] = useState("light");

  // Theme switcher function
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", theme == "light" ? "dark" : "light");
  };

  const listItems = (
    <>
      <li className="link-style">
        <NavLink to="/" onClick={() => setShowMenu(!showMenu)}>
          All Task
        </NavLink>
      </li>
      <li className="link-style">
        <NavLink to="/add-task" onClick={() => setShowMenu(!showMenu)}>
          Add Task
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );

  console.log(theme);
  return (
    <div className="sticky shadow-black top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 border-b border-b-slate-300/75 border-t-0 dark:border-b-slate-100/20 bg-white/75 supports-backdrop-blur:bg-white/95 dark:bg-black/75">
      <div className="flex items-center justify-between navbar max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              onClick={() => setShowMenu(true)}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu shadow-md bg-white dark:bg-black border border-slate-300 dark:border-slate-600 lg:text-md menu-sm dropdown-content ${
                !showMenu && "hidden"
              } mt-3 p-2 shadow rounded-box w-52`}
            >
              {listItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Task Planner</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex items-center lg:text-base menu-horizontal px-1">
            {listItems}
            <li className="hover:text-black dark:hover:text-white">
              <button
                className="hover:scale-110 ml-2 text-[1.2rem] duration-200"
                onClick={toggleTheme}
              >
                {theme === "light" ? <FaMoon></FaMoon> : <FaSun></FaSun>}
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar-end md:hidden">
          <button
            className="flex navbar-end md:hidden items-center justify-evenly w-auto gap-1 border border-slate-300 dark:border-slate-600 py-1 px-2 rounded-lg hover:text-black dark:hover:text-white text-base duration-200"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <FaMoon></FaMoon> Dark
              </>
            ) : (
              <>
                <FaSun></FaSun> Light
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
