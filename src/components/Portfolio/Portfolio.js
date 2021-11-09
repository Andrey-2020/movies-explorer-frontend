import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__subtitle">Портфолио</h3>
            <div className="portfolio__task">
                <p className="portfolio__task-text">Статичный сайт</p>
                <a className="portfolio__task-link" alt="" href="https://andrey-2020.github.io/how-to-learn/" target="_blank" rel="noreferrer"/>
            </div>
            <div className="portfolio__task">
                <p className="portfolio__task-text">Адаптивный сайт</p>
                <a className="portfolio__task-link" href="https://andrey-2020.github.io/russian-travel/index.html" target="_blank" rel="noreferrer"/>
            </div>
            <div className="portfolio__task">
                <p className="portfolio__task-text">Одностраничное приложение</p>
                <a className="portfolio__task-link" alt="" href="https://andrey-2020.github.io/mesto/" target="_blank"/>
            </div>
        </section>
    );
}

export default Portfolio;
