import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({isSaved}) {
    return (
        <section className="movies-card-list">
            {/* <span className="search-form__error">{foundError ? "Ничего не найдено" : ""}</span> */}
            <ul className="movies__collection">
                <MoviesCard movies={{"name":'33 слова о дизайне', image: './images/movies-image1.jpg', duration: '1ч 47м'}} isSaved={isSaved} />
                <MoviesCard movies={{"name":'Киноальманах «100 лет дизайна»', image: './images/movies-image2.png', duration: '1ч 3м'}} isSaved={isSaved} />
                <MoviesCard movies={{"name":'В погоне за Бенкси', image: './images/movies-image3.png', duration: '1ч 42м'}} isSaved={isSaved}/>
            </ul>
        </section>

    )
};
export default MoviesCardList;