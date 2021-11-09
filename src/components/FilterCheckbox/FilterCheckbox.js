import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isFilterMovies, changeFilter }) {
  return (
    <div className="filterCheckbox">
      <input type="checkbox" id="movies-checkbox" className="filterCheckbox__invisible-checkbox" />
      <label htmlFor="movies-checkbox" className="filterCheckbox__visible-checkbox"></label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  )
};
export default FilterCheckbox;