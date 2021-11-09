import React from "react";
// import logo from './images/logo';
import Header from "../Header/Header";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className={`form form_type_search`} name={`form-search`} >
      <input className="form__input form__input-search" type="text" name="username" placeholder="Фильм"
        minLength="2" id="username-input" required />
      <div className="form__search-right">
        <button className="form__button form__button_type_search" type="submit" aria-label="submit"></button>
      </div>
    </form>
  );
}

export default SearchForm;
