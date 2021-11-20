import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function Movies() {


    return (
        <section className="movies">
            <div className="saved-movies__content">
            <Header isLogged={true} isMain={false} isMovies={true} isSavedMovies={false} isProfile={false} />
            <SearchForm/>
            <FilterCheckbox />
            <MoviesCardList isSaved={false}/>
            <button type="button" className={ "movies__button"}>Ещё</button>
            </div>
            <Footer />
        </section>


    )
};
export default Movies;