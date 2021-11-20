import React from "react";
import './App.css';
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
function App() {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/" /*isLogged={isLogged}*/>
          <Main isLogged={false} />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
