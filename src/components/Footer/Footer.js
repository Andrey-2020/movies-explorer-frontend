import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <section className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__container-year">@ 2021</p>
                <div className="footer__links">
                <a className="footer__link" alt="" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
                <a className="footer__link" alt="" href="https://github.com/Andrey-2020" target="_blank">Github</a>
                <a className="footer__link" alt="" href="#" target="_blank">Facebook</a>
                </div>
            </div>
        </section>
    );
}

export default Footer;
