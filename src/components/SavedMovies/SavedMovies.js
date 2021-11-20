import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function SavedMovies() {


    return (
        <section className="savedMovies">
            <div className="saved-movies__content">
                <Header isLogged={true} isMain={false} isMovies={false} isSavedMovies={true} isProfile={false} />
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList isSaved={true} />
            </div>
            <Footer />
        </section>


    )
};
export default SavedMovies;