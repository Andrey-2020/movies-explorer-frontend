import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../../images/profile.png";
import "./Navigation.css";
function Navigation({ isLogged, isMain, isMovies, isSavedMovies, isProfile }) {
  const [isShowBurgerMenu, setIsShowBurgerMenu] = React.useState(false);
  function showBurgerMenu() {
    setIsShowBurgerMenu(true);
  }
  function closeBurgerMenu() {
    setIsShowBurgerMenu(false);
  }
  return (

    <nav className="navigation">
      {isLogged
        ?
        <>
          <div className="navigation_logged">
            <div className="navigation__links">
              <Link to="/movies" className="navigation__movie">Фильмы</Link>
              <Link to="/saved-movies" className="navigation__movie">Сохранённые фильмы</Link>
            </div>
            <div className="navigation__profile">
              <Link to="/profile" className={isMain ? "navigation__account navigation__account_main" : "navigation__account"}>Аккаунт</Link>
              <img className="navigation__profile-image" alt="Профиль" src={profileImage} />
            </div>
          </div>
          <button className={`navigation__burger-menu ${isMain ? "navigation__burger-menu_type_blue" : ""}`} onClick={showBurgerMenu}></button>
          <div className={`burger-menu ${isShowBurgerMenu ? "burger-menu_show" : "burger-menu_hidden"}`}>
            <div className="burger-menu__container">
              <button tupe="button" className="burger-menu__close-button" onClick={closeBurgerMenu}></button>
              <div className="burger-menu__content">
                <ul className="burger-menu__links">
                  <li className="burger-menu__link-container"> <Link to="/" className={`burger-menu__link ${isMain ? "burger-menu__link_underline" : ""}`}>Главная</Link></li>
                  <li className="burger-menu__link-container"><Link to="/movies" className={`burger-menu__link ${isMovies ? "burger-menu__link_underline" : ""}`}>Фильмы</Link></li>
                  <li className="burger-menu__link-container"><Link to="/saved-movies" className={`burger-menu__link ${isSavedMovies ? "burger-menu__link_underline" : ""}`}>Сохранённые фильмы</Link></li>
                </ul>
                <div className={`navigation__profile ${isShowBurgerMenu ? "navigation__profile-burger" : ""}`}>
                  <Link to="/profile" className={isProfile ? "navigation__account navigation__account_profile" : "navigation__account"}>Аккаунт</Link>
                  <img className="navigation__profile-image" alt="Профиль" src={profileImage} />
                </div>
              </div>
              {/* <Link to="/profile" className={isMain ? "burger-menu__profile burger-menu__decoration-profile" : "burger-menu__profile"}>Аккаунт</Link> */}
            </div>
          </div>
        </>
        :
        <div className="navigation__links">
          <Link to="/signup" className={isMain ? "navigation__link" : "navigation__link navigation__link_black"}>Регистрация</Link>
          <Link to="/signin" className="navigation__link">Войти</Link>
        </div>
      }

    </nav>
  );
}

export default Navigation;
