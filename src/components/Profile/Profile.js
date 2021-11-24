import React, {useCallback} from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ isLogged, onSignOut, changeProfile, profileError, setProfileError }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });

        setErrors({ ...errors, [name]: target.validationMessage });

        setIsValid(target.closest("form").checkValidity());
    };


    function handleClickSignOut() {
        onSignOut();
    }
    function handleChangeInput(e) {
        handleChange(e);
    }
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    function submirEditUserProfile(e) {
        e.preventDefault();
        changeProfile({ email: values.email, name: values.name });
        resetForm();
    }
    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);
    return (
        <section className="profile">
            <Header isLogged={true} isMain={false} isProfile={true} isMovies={false} isSavedMovies={false} />
            <h1 className="profile__title" >Привет, {currentUser.name}!</h1>
            <form className="profile__form" onSubmit={submirEditUserProfile}> 
                <div className="profile__fields">
                    <div className="profile__field">
                        <p className="profile__text">Имя</p>
                        <input className="profile__input" value={values.name} placeholder="Виталий" name="name" type="text" minLength="2" onChange={handleChangeInput} required />
                    </div>
                    <div className="profile__field">
                        <p className="profile__text">E-mail</p>
                        <input className="profile__input" value={values.email} placeholder="pochta@yandex.ru" name="email" type="email" onChange={handleChangeInput} required />
                    </div>
                </div>
                <div className="profile__buttons">
                    <button className="profile__button-submit" type="submit">Редактировать</button>
                    <button className="profile__button-logout" type="button" onClick={handleClickSignOut}>Выйти из аккаунта</button>
                </div>

            </form>
        </section>
    )
};
export default Profile;