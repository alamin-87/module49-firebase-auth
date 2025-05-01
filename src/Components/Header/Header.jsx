import React from "react";
import { NavLink } from "react-router";
import './Header.css'

const Header = () => {
  return (
    <>
      <nav className=" flex justify-center items-center">
        <ul className=" flex gap-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Header;
