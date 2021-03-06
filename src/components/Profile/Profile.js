import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ isLogged }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <section className="profile">
            <Header isLogged={true} isMain={false} isProfile={true} isMovies={false} isSavedMovies={false} />
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form">
                <div className="profile__fields">
                    <div className="profile__field">
                        <p className="profile__text">Имя</p>
                        <input className="profile__input" placeholder="Виталий" name="name" type="text" minLength="2" required />
                    </div>
                    <div className="profile__field">
                        <p className="profile__text">E-mail</p>
                        <input className="profile__input" placeholder="pochta@yandex.ru" name="email" type="email" required />
                    </div>
                </div>
                <div className="profile__buttons">
                    <button className="profile__button-submit" type="submit">Редактировать</button>
                    <button className="profile__button-logout" type="button" >Выйти из аккаунта</button>
                </div>

            </form>
        </section>
    )
};
export default Profile;