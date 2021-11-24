const BASE_URL = 'https://movies-explorer-diplom.nomoredomains.rocks/api';
const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    let err = new Error(`Ошибка ${res.status}`);
    err.status = res.status;
    throw err;
}
export const register = ({ email, password, name }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email,
            "name": name,
        })
    }).then(checkResponse)
}

export function authorize({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email,
        })
    })
        .then(checkResponse)
};
export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(checkResponse)
}
export const editUserProfile = ({ jwt, name, email }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then(checkResponse)
}