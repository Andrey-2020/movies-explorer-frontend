import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function SavedMovies({ isLogged, setFilter, isFilterMovies, moviesCollection, searchFilterTime, setFoundError,
    setFilterTimeSavedMoviesCollection, filterTimeSavedMoviesCollection, searchMovies, searchSavedMovies,
    isLoadingMovies, savedMovies, movieSaveDelete, movieSaveInStore, foundError, serverError, clearAllErrors }) {

    React.useEffect(() => {
        clearAllErrors();
    }, []);
    function changeFilter() {
        setFilter();
    }
    React.useEffect(() => {
        setFoundError(false);
        if (isFilterMovies) {
            const result = searchFilterTime(moviesCollection);
            if (result.length > 0) {
                setFoundError(false);
            }
            else {
                setFoundError(true);
            }
            setFilterTimeSavedMoviesCollection(result);

        }
    }, [isFilterMovies])


    return (
        <section className="savedMovies">
            <div className="saved-movies__content">
                <Header isLogged={isLogged} isMain={false} isProfile={false} isMovies={false} isSavedMovies={true} />
                <SearchForm isSaved={true} searchMovies={searchMovies} searchSavedMovies={searchSavedMovies} />
                <FilterCheckbox isFilterMovies={isFilterMovies} changeFilter={changeFilter} />
                <MoviesCardList moviesCollection={isFilterMovies ? filterTimeSavedMoviesCollection : moviesCollection} isSaved={true} isLoadingMovies={isLoadingMovies}
                    savedMovies={savedMovies} movieSaveDelete={movieSaveDelete}
                    movieSaveInStore={movieSaveInStore} foundError={foundError} serverError={serverError} />
            </div>
            <Footer />
        </section>


    )
};
export default SavedMovies;