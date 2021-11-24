import React from "react";
// import logo from './images/logo';
import "./SearchForm.css";

function SearchForm({ isSaved, searchMovies, searchSavedMovies }) {
  const [validForm, setValidForm] = React.useState(true);
  const [textInput, setTextInput] = React.useState("");
  function handleChangeInput(e) {
    setTextInput(e.target.value);
    setValidForm(e.target.checkValidity());
  }
  function handleSearchMovies(e) {
    e.preventDefault();
    searchMovies(textInput);
    setTextInput("");
  }
  function handleSearchSavedMovies(e) {
    e.preventDefault();
    searchSavedMovies(textInput);
    setTextInput("");
  }
  return (
    <>
      <form className={`form form_type_search`} name={`form-search`} onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies}>
        <input className="form__input form__input-search" type="text" name="username" placeholder="Фильм"
          minLength="2" id="username-input" onChange={handleChangeInput} value={textInput} required />
        <div className="form__search-right">
          <button className="form__button form__button_type_search" disabled={!validForm} type="submit" aria-label="submit"></button>
        </div>
      </form>
      <span className="search-form__error">{validForm ? "" : "Нужно ввести ключевое слово"}</span>
    </>
  );
}

export default SearchForm;
