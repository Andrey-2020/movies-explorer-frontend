import React from "react";
// import logo from './images/logo';
import "./SearchForm.css";

function SearchForm({ isSaved, searchMovies, searchSavedMovies }) {
  const [validForm, setValidForm] = React.useState(true);
  const [textInput, setTextInput] = React.useState("");
  function handleChangeInput(e) {

    setTextInput(e.target.value);
  }
  function handleSearchMovies(e) {
    e.preventDefault();
    if (!textInput) {
      setValidForm(false)
    } else {
      searchMovies(textInput);
      setValidForm(true)
      setTextInput("");
      }
    }
    function handleSearchSavedMovies(e) {
      e.preventDefault();
      if (!textInput) {
        setValidForm(false)
      } else {
        searchSavedMovies(textInput);
        setValidForm(true)
        setTextInput("");
        }
    }
    return (
      <>
        <form className={`form form_type_search`} name={`form-search`} onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies} noValidate>
          <input className="form__input form__input-search" type="text" name="username" placeholder="Фильм"
            id="username-input" onChange={handleChangeInput} value={textInput} required />
          <div className="form__search-right">
            <button className="form__button form__button_type_search" type="submit" aria-label="submit"></button>
          </div>
        </form>
        <span className="search-form__error">{validForm ? "" : "Нужно ввести ключевое слово"}</span>
      </>
    );
  }

  export default SearchForm;
