import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isFilterMovies, changeFilter }) {
  function handleChangeFilter() {
      changeFilter();
  }
  return (
    <div className="filterCheckbox">
      <input type="checkbox" id="movies-checkbox" className="filterCheckbox__invisible-checkbox" onClick={handleChangeFilter}/>
      <label htmlFor="movies-checkbox" className="filterCheckbox__visible-checkbox" ></label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  )
};
export default FilterCheckbox;