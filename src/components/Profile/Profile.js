import React, { useCallback } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import * as yup from 'yup';
import { Formik } from 'formik';
import "./Profile.css";

function Profile({ isLogged, onSignOut, changeProfile, profileError, setProfileError }) {
    const currentUser = React.useContext(CurrentUserContext);
    const validationsSchema = yup.object().shape({
        name: yup.string().matches(/^[а-яА-Яa-zA-ZёË\- ]{1,}$/, 'Имя должно содержать только латиницу, кириллицу, пробел или дефис').typeError('Должно быть строкой').min(2, 'Имя должно содержать минимум 2 символа').max(30, 'Имя должно содержать максимум 30 символов')
            .required('Обязательно'),
        email: yup.string().typeError('Должно быть строкой').email('Введите верный email').required('Обязательно'),
    })

    // const [values, setValues] = React.useState({});
    // const [errors, setErrors] = React.useState({});
    // const [isValid, setIsValid] = React.useState(false);

    // const handleChange = (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     const value = target.value;
    //     setValues({ ...values, [name]: value });

    //     setErrors({ ...errors, [name]: target.validationMessage });

    //     setIsValid(target.closest("form").checkValidity());
    // };


    function handleClickSignOut() {
        onSignOut();
    }
    function handleChangeInput(e) {
        if (profileError.length > 0) {
            setProfileError("");
        }
    }
    // const resetForm = useCallback(
    //     (newValues = {}, newErrors = {}, newIsValid = false) => {
    //         setValues(newValues);
    //         setErrors(newErrors);
    //         setIsValid(newIsValid);
    //     },
    //     [setValues, setErrors, setIsValid]
    // );
    function submirEditUserProfile(values) {
        changeProfile({ email: values.email, name: values.name });
    }
    // React.useEffect(() => {
    //     setValues(currentUser);
    // }, [currentUser, setValues]);
    return (
        <section className="profile">
            <Header isLogged={isLogged} isMain={false} isProfile={true} isMovies={false} isSavedMovies={false} />
            <h1 className="profile__title" >Привет, {currentUser.name}!</h1>
            <Formik
                initialValues={{
                    name: currentUser.name,
                    email: currentUser.email
                }}
                enableReinitialize
                validateOnBlur={false}
                onSubmit={(values) => { submirEditUserProfile(values) }}
                validationSchema={validationsSchema}
            >
                {({ values, errors, handleChange, handleBlur, touched, setTouched, isValid, handleSubmit, dirty }) => (
                    <form className={`profile__form`} onSubmit={handleSubmit} noValidate >

                        <div className="profile__fields">
                            <div className="profile__field">
                                <p className="profile__text">Имя</p>
                                <input
                                    className={'profile__input'}
                                    type={`name`}
                                    name={`name`}
                                    onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }); handleChangeInput(e) }}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Виталий"
                                />
                            </div>
                            {touched.name && errors.name && <span className={'form__input-error'}>{errors.name}</span>}
                            <div className="profile__field">
                                <p className="profile__text">E-mail</p>
                                <input
                                    className={'profile__input'}
                                    type={`email`}
                                    name={`email`}
                                    onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }); handleChangeInput(e) }}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="pochta@yandex.ru"
                                />
                            </div>
                            {touched.email && errors.email && <span className={'form__input-error'}>{errors.email}</span>}
                            {console.log(errors)}
                        </div>
                        <div className="profile__buttons">
                            <span className="profile__error">{profileError}</span>
                            <button  className={isValid && dirty ? "profile__button-submit" : "profile__button-submit profile__button_invalid"} type="submit" disabled={!isValid || !dirty}>Редактировать</button>
                            <button className="profile__button-logout" type="button" onClick={handleClickSignOut}>Выйти из аккаунта</button>
                        </div>
                    </form>
                )}
            </Formik>
            {/* 
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


            </form> */}
        </section>
    )
};
export default Profile;