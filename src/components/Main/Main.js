import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({ isLogged }) {

    return (
        <div className="main">
            <Promo isLogged={isLogged} isMain={true} isMovies={false} isSavedMovies={false} isProfile={false} />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </div>
    )
};
export default Main;