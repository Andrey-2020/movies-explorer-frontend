import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({isLogged, isMain, isMovies, isSavedMovies, isProfile}) {
  return (
      <header className={`header ${isMain?'header header_type_blue': ''}`}>
        <Link className={"header__logo"} alt="logo" to="/"/>
        <Navigation isLogged={isLogged} isMain={isMain} isMovies={isMovies} isSavedMovies={isSavedMovies} isProfile={isProfile}/>
      </header>
  );
}

export default Header;
