import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function Movies({ isLogged, setFilter, setFoundError, isFilterMovies, searchFilterTime, filterTimeMoviesCollection, setFilterTimeMoviesCollection,
     moviesCollection, searchSavedMovies,
    searchMovies, isLoadingMovies, savedMovies, movieSaveDelete, movieSave, foundError, serverError, clearAllErrors }) {

    React.useEffect(() => {
        clearAllErrors();
    }, []);
    function changeFilter() {
        setFilter();
    }

    React.useEffect(() => {
        setFoundError(false);
        if (isFilterMovies) {
            if (moviesCollection.length > 0) {
                const result = searchFilterTime(moviesCollection);
                if (result.length > 0) {
                    setFoundError(false);
                }
                else {
                    setFoundError(true);
                }
                setFilterTimeMoviesCollection(result);
            }
        }
    }, [isFilterMovies])

    const [numberMovies, setNumberMovies] = React.useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1279) {
            return 16
        } else if (windowWidth >= 990) {
            return 12
        } else if (windowWidth >= 500) {
            return 8
        } else return 5
    })
    const [numberMoviesAdd, setNumberMoviesAdd] = React.useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1279) {
            return 4
        } else if (windowWidth >= 990) {
            return 3
        } else if (windowWidth >= 500) {
            return 2
        } else return 2
    })
    function onChangeScreenWidth() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1279) {
            setNumberMovies(16);
            setNumberMoviesAdd(4);
        } else if (windowWidth >= 990) {
            setNumberMovies(12);
            setNumberMoviesAdd(3);
        } else if (windowWidth >= 500) {
            setNumberMovies(8);
            setNumberMoviesAdd(2);
        } else {
            setNumberMovies(5);
            setNumberMoviesAdd(2);
        }
    }
    React.useEffect(() => {
        window.addEventListener('resize', onChangeScreenWidth);
    }, []);

    const moviesCollectionVisible = (isFilterMovies ? filterTimeMoviesCollection : moviesCollection).slice(0, numberMovies);
    function addMoviesInCollectionVisible() {
        setNumberMovies(prevState => prevState + numberMoviesAdd);
    }

    return (
        <section className="movies">
            <div className="saved-movies__content">
                <Header isLogged={isLogged} isMain={false} isMovies={true} isSavedMovies={false} isProfile={false} />
                <SearchForm isSaved={false} searchMovies={searchMovies} searchSavedMovies={searchSavedMovies} />
                <FilterCheckbox isFilterMovies={isFilterMovies} changeFilter={changeFilter} />
                <MoviesCardList moviesCollection={moviesCollectionVisible} isSaved={false}
                    isLoadingMovies={isLoadingMovies} savedMovies={savedMovies}
                    movieSaveDelete={movieSaveDelete}
                    movieSave={movieSave} foundError={foundError} serverError={serverError} />
                <button type="button" onClick={addMoviesInCollectionVisible}
                    className={moviesCollectionVisible.length === (isFilterMovies ? filterTimeMoviesCollection : moviesCollection).length ? "movies__button_hide" : "movies__button"}>Ещё</button>
            </div>
            <Footer />
        </section>


    )
};
export default Movies;