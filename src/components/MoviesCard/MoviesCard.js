import React from "react";
import "./MoviesCard.css";
function MoviesCard( {movies, isSaved}) {

    const [isLike, setIsLike] = React.useState(false);
    function handleLikeCard(e) {
        setIsLike(!isLike);
    }
    return (
            <li className="movies-card">
                <img className="movies-card-image" src={movies.image} alt={movies.name}/>
                <div className="movies-card__content">
                <p className="movies-card__name">{movies.name}</p>
               { isSaved ? <button type="button"
                        className={"movies-card__delete-button_visible" }>
                    </button>
                        :
                <button type="button"
                            onClick={handleLikeCard}
                            className={isLike ? "movies-card__like movies-card__like_active" : "movies-card__like movies-card__like_inactive"}>
                        </button>
                }
                </div>
                <p className="movies-card__time">{movies.duration}</p>
            </li>
    )
};
export default MoviesCard;