const BASE_URL = 'https://movies-explorer-diplom.nomoredomains.rocks/api';
const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    let err = new Error(`Ошибка ${res.status}`);
    err.status = res.status;
    throw err;
}

export const getSavedMovies = (jwt) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }).then(checkResponse)
}
export const deleteSavedMovie = ({ jwt, id }) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }).then(checkResponse)
}
export const saveMovie = ({ jwt, movie }) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: movie.image,
            trailer: movie.trailer,
            thumbnail: movie.thumbnail,
            movieId: String(movie.movieId),
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        })
    }).then(checkResponse)
}