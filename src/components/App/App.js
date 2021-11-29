import React from "react";
import './App.css';
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { getContent, register, authorize, editUserProfile } from '../../utils/userAuth.js'
import { saveMovie, deleteSavedMovie, getSavedMovies } from '../../utils/MoviesApi.js'
import { getInitialMovies } from '../../utils/MainApi.js'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [serverError, setServerError] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' })
  const history = useHistory();
  const [isLoadingMovies, setIsLoadingMovies] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");

  const [moviesCollection, setMoviesCollection] = React.useState([]);
  const [foundError, setFoundError] = React.useState([]);
  const [filterMoviesCollection, setFilterMoviesCollection] = React.useState([]);

  const [isFilterMovies, setIsFilterMovies] = React.useState(false);
  const [filterTimeMoviesCollection, setFilterTimeMoviesCollection] = React.useState([]);

  const [savedMoviesCollection, setSavedMoviesCollection] = React.useState([]);

  const [filterTimeSavedMoviesCollection, setFilterTimeSavedMoviesCollection] = React.useState([]);
  const [filterSavedMoviesCollection, setFilterSavedMoviesCollection] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    const movies = localStorage.getItem('movies');
    const savedMovies = localStorage.getItem('savedMovies');

    if (jwt) {
      if (movies) {
        const result = JSON.parse(movies);
        setMoviesCollection(result);
      }
      if (savedMovies) {
        const resultSave = JSON.parse(savedMovies);
        setSavedMoviesCollection(resultSave);
        setFilterSavedMoviesCollection(resultSave);
      }
      getContent(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLogged(true);
          // history.push('/movies');
        })
        .catch((err) => {
          setServerError(true);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }
  React.useEffect(() => {
    tokenCheck();
  }, []);
  function onSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setIsLogged(false);
    setMoviesCollection([]);
    setSavedMoviesCollection([]);
    setFilterTimeSavedMoviesCollection([]);
    setFilterSavedMoviesCollection([]);
    setFilterTimeMoviesCollection([]);
    setFilterMoviesCollection([]);
    clearAllErrors();
    history.push('/');
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLogged(true);
          history.push('/movies');
          getSavedMovies(data.token)
            .then((movies) => {
              setSavedMoviesCollection(movies);
              setFilterSavedMoviesCollection(movies);
              localStorage.setItem('savedMovies', JSON.stringify(movies));
            })
            .catch((err) => console.log(err));
          getContent(data.token)
            .then((user) => {
              setCurrentUser(user);
            })
            .catch((err) => {
              setServerError(true);
              setProfileError("Не удалось загрузить данные")
            })
            .finally(() => {
              setLoading(false);
            })
        }
      }).catch((err) => {
        if (err.status === 400) return setLoginError('Не валидный email или пароль');
        if (err.status === 401) return setLoginError('Пользователь с email не найден');
        setLoginError('Попробуйте еще раз');
        console.log(err);
      })
  }

  function handleRegister({ email, password, name }) {
    register({ email, password, name })
      .then((data) => {
        if (data._id) {
          handleLogin({ email, password })
        }
      }).catch((err) => {
        setRegisterError('Что-то пошло не так! Попробуйте ещё раз.');
        if (err.status === 400) return setRegisterError('Некорректно заполнено одно из полей ');
      })
  }
  function changeProfile({ name, email }) {
    const jwt = localStorage.getItem('jwt')
    editUserProfile({ jwt, name, email })
      .then((newUser) => {
        if (newUser._id) {
          setCurrentUser(newUser);
          setProfileError("Данные профиля успешно изменены");
        }
        else if (newUser.message) {
          setProfileError(newUser.message);
        }
      }).catch((err) => setProfileError("Произошла ошибка при обновлении профиля"));
  }

  function clearAllErrors() {
    setLoginError("");
    setRegisterError("");
    setFoundError(false);
    setServerError(false);
    setProfileError("");
  }

  function searchMovies(searchText) {
    setServerError(false);
    setIsLoadingMovies(true);
    if (moviesCollection.length > 0) {
      const result = search(moviesCollection, searchText);
      if (result.length > 0) {
        setFoundError(false);
      }
      else {
        setFoundError(true);
      }
      setFilterMoviesCollection(result);
    }
    else {
      getInitialMovies()
        .then((res) => {
          setMoviesCollection(res);
          localStorage.setItem('movies', JSON.stringify(res));
          const result = search(res, searchText);
          if (result.length > 0) {
            setFoundError(false);
          }
          else {
            setFoundError(true);
          }
          setFilterMoviesCollection(result);
          if (isFilterMovies) {
            const resultTimeFilter = searchFilterTime(result);
            if (resultTimeFilter.length > 0) {
              setFoundError(false);
            }
            else {
              setFoundError(true);
            }
            setFilterTimeMoviesCollection(resultTimeFilter);
          }
        })
        .catch((err) => setServerError(true));
    }
    setTimeout(() => {
      setIsLoadingMovies(false);
    }, 1000);

  }
  function searchSavedMovies(searchText) {
    const jwt = localStorage.getItem('jwt')
    setServerError(false);
    if (savedMoviesCollection.length > 0) {
      setFilterSavedMoviesCollection(search(savedMoviesCollection, searchText));
    }
    else {
      setIsLoadingMovies(true);
      getSavedMovies(jwt)
        .then((res) => {
          setSavedMoviesCollection(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
          setFilterSavedMoviesCollection(search(savedMoviesCollection, searchText));
        })
        .catch((err) => setServerError(true));
      setTimeout(() => {
        setIsLoadingMovies(false);
      }, 1000);

    }
  }

  function movieSaveDelete(id) {
    const jwt = localStorage.getItem('jwt')
    setIsLoadingMovies(true);
    deleteSavedMovie({ jwt, id })
      .then(() => {
        const result = filterMoviesById(savedMoviesCollection, id);
        setSavedMoviesCollection(result);
        localStorage.setItem('savedMovies', JSON.stringify(result));
        setFilterSavedMoviesCollection(filterMoviesById(filterSavedMoviesCollection, id));
        setFilterTimeSavedMoviesCollection(filterMoviesById(filterTimeMoviesCollection, id));
      })
      .catch((err) => setServerError(true));
    setTimeout(() => {
      setIsLoadingMovies(false);
    }, 1000);

  }
  function movieSave(movie) {
    const jwt = localStorage.getItem('jwt')
    setIsLoadingMovies(true);
    saveMovie({ jwt, movie })
      .then((res) => {
        const movies = [...savedMoviesCollection, res];
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMoviesCollection(oldMovieSave => [...oldMovieSave, res]);
        if (isFilterMovies) {
          setFilterTimeSavedMoviesCollection(oldMovieSave => [...oldMovieSave, res]);

          setFilterSavedMoviesCollection(oldMovieSave => [...oldMovieSave, res]);
        }
        else {
          setFilterSavedMoviesCollection(oldMovieSave => [...oldMovieSave, res]);
        }
      }).catch((err) => setServerError(true));
    setTimeout(() => {
      setIsLoadingMovies(false);
    }, 1000);

  }
  function filterMoviesById(collection, id) {
    return collection.filter((item) => { return item._id !== id });
  }

  function search(collection, searchText) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(searchText.toLowerCase())) {
        result.push(movie);
      }
    })
    return result;
  }
  function searchFilterTime(collection) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.duration <= 40) {
        console.log(movie)
        result.push(movie);
      }
    })
    return result;
  }
  function changeFilter() {
    setIsFilterMovies(!isFilterMovies);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/" isLogged={isLogged}>
          <Main isLogged={isLogged} />
        </Route>
        <ProtectedRoute exact path="/movies" isLogged={isLogged} loading={loading}>
          <Movies
            isLogged={isLogged}
            isFilterMovies={isFilterMovies}
            setFilter={changeFilter}
            setFoundError={setFoundError}
            searchFilterTime={searchFilterTime}
            moviesCollection={filterMoviesCollection}
            filterTimeMoviesCollection={filterTimeMoviesCollection}
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            setFilterTimeMoviesCollection={setFilterTimeMoviesCollection}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMoviesCollection}
            movieSaveDelete={movieSaveDelete}
            movieSave={movieSave}
            foundError={foundError}
            serverError={serverError}
            clearAllErrors={clearAllErrors} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" isLogged={isLogged} loading={loading}>
          <Profile
            isLogged={isLogged}
            onSignOut={onSignOut}
            changeProfile={changeProfile}
            profileError={profileError}
            setProfileError={setProfileError} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLogged={isLogged} loading={loading}>
          <SavedMovies isLogged={isLogged}
            isFilterMovies={isFilterMovies}
            setFilter={changeFilter}
            setFoundError={setFoundError}
            searchFilterTime={searchFilterTime}
            filterTimeSavedMoviesCollection={filterTimeSavedMoviesCollection}
            moviesCollection={filterSavedMoviesCollection}
            setFilterTimeSavedMoviesCollection={setFilterTimeSavedMoviesCollection}
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMoviesCollection}
            movieSaveDelete={movieSaveDelete}
            movieSave={movieSave}
            foundError={foundError}
            serverError={serverError}
            clearAllErrors={clearAllErrors} />
        </ProtectedRoute>


        <Route exact path="/signin">
          {isLogged ? <Redirect to="/" /> : <Login onLogin={handleLogin} clearErrors={clearAllErrors} loginError={loginError} setLoginError={setLoginError} />}
        </Route>
        <Route exact path="/signup">
          {isLogged ? <Redirect to="/" /> : <Register onRegister={handleRegister} clearErrors={clearAllErrors} registerError={registerError} setRegisterError={setRegisterError} />}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
