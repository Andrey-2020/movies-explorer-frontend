import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";
const $ = require( "jquery" );

function NavTab() {
    function flowingscroll(){
        $('.nav-tab__link').on('click', function() {
            var el = $(this);
            var dest = el.attr('href'); // получаем направление
            console.log(dest)
            if (dest !== undefined && dest !== '') { // проверяем существование
              $('html').animate({
                  scrollTop: $(dest.slice(1)).offset().top // прокручиваем страницу к требуемому элементу
                }, 500 // скорость прокрутки
              );
            }
            return false;
        })
    }
  return (
    <nav className="nav-tab">
    <Link className="nav-tab__link" to="#project" onClick={flowingscroll}>Узнать больше</Link>
    </nav>
  );
}

export default NavTab;
