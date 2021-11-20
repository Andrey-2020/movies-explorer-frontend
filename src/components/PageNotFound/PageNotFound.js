import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-not-found">
            <div className="page-not-found__container">
                <h1 className="page-not-found__title">404</h1>
                <p className="page-not-found__text">Страница не найдена</p>
            </div>
            <Link className="not-found__link" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound;