import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { Formik } from 'formik';
import "./Login.css";

function Login({ onLogin, clearErrors, loginError, setLoginError }) {
    const validationsSchema = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой').email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').min(8, 'Пароль должен содержать минимум 8 символов').required('Обязательно')
    })


    function handleLogin(values) {
        onLogin({ email: values.email, password: values.password });

    }
    function handleClearErrors() {
        clearErrors();
    }

    return (
        <section className="login">
            <Link to="/" className="login__logo"></Link>
            <h2 className="login__title">Рады видеть!</h2>
            <Formik
                initialValues={{
                    password: '',
                    email: ''
                }}
                validateOnBlur={false}
                onSubmit={(values) => { handleLogin(values) }}
                validationSchema={validationsSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, setTouched, isValid, handleSubmit, dirty }) => (
                    <form className={`form form_type_login`} onSubmit={handleSubmit} noValidate>
                        <fieldset className="form__input-container form__input-container_type_login">
                            <p className="form__text">E-mail</p>
                            <input
                                className={'form__input form__input-login form__input_type_email'}
                                type={`email`}
                                name={`email`}
                                onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }) }}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="E-mail"
                            />
                            {touched.email && errors.email && <span className={'name-input-error form__input-error'}>{errors.email}</span>}

                            <p className="form__text">Пароль</p>
                            <input
                                className={'form__input form__input-login form__input_type_password'}
                                type={`password`}
                                name={`password`}
                                onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }) }}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Пароль"
                            />
                            {touched.password && errors.password && <span className={'name-input-error form__input-error'}>{errors.password}</span>}
                        </fieldset>
                        <span className="login__error">{loginError}</span>
                        <button
                            disabled={!isValid || !dirty}
                            type={`submit`}
                            className={(isValid && !Object.values(values).includes('')) ? "form__button form__button_type_login" : " form__button form__button_type_login form__button_invalid"}
                        >Войти</button>
                    </form>
                )}
            </Formik>
            <div className="login__links">
                <p className="login__answer">Ещё не зарегистрированы?</p>
                <Link className="login__link" to="/signup" onClick={handleClearErrors}>Регистрация</Link>
            </div>
        </section >
    )

};
export default Login;