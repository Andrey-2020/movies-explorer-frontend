import React from "react";
// import logo from './images/logo';
import Header from "../Header/Header";
import "./Promo.css";
import NavTab from "../NavTab/NavTab";
function Promo() {
  return (
    <section className="promo-page">
      <Header isLogged={true} isMain={true} isMovies={false} isSavedMovies={false} isProfile={false} />
      <div className="promo-page__content">
        <div className="promo-page__container">
          <h1 className="promo-page__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo-page__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <div className="promo-page__logo"></div>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;
