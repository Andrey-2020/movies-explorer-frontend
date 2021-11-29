import React from "react";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { Formik } from 'formik';
import "./Register.css";

function Register({ onRegister, clearErrors, registerError, setRegisterError }) {
    const validationsSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').min(2, 'Имя должно содержать минимум 2 символа').max(30, 'Имя должно содержать максимум 30 символов')
        .matches(/^[а-яА-Яa-zA-ZёË\- ]{1,}$/, 'Имя должно содержать только латиницу, кириллицу, пробел или дефис').required('Обязательно'),
        email: yup.string().typeError('Должно быть строкой').email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').min(8, 'Пароль должен содержать минимум 8 символов').required('Обязательно')
    })


    function handleSubmit(values) {
        onRegister({ email: values.email, name: values.name, password: values.password });
    }

    function handleClearErrors() {
        clearErrors();
    }
    return (
        <section className={'register'}>
            <div className={`register__container`}>
                <Link to="/" className="register__logo" />
                <h2 className="register__title">Добро пожаловать!</h2>
                <Formik
                    initialValues={{
                        name: '',
                        password: '',
                        email: ''
                    }}
                    validateOnBlur={false}
                    onSubmit={(values) => { handleSubmit(values) }}
                    validationSchema={validationsSchema}
                >
                    {({ values, errors, handleChange, handleBlur, touched, setTouched, isValid, handleSubmit, dirty }) => (
                        <form className={`form form_type_register`} onSubmit={handleSubmit} noValidate >

                            <fieldset className="form__input-container form__input-container_type_register">
                                <p className="form__text">Имя</p>
                                <input
                                    className={'form__input form__input-register form__input_type_username'}
                                    type={`name`}
                                    name={`name`}
                                    onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }) }}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Имя"
                                    required
                                />

                                {touched.name && errors.name && <span className={'name-input-error form__input-error'}>{errors.name}</span>}

                                <p className="form__text">E-mail</p>
                                <input
                                    className={'form__input form__input-register form__input_type_email'}
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
                                    className={'form__input form__input-register form__input_type_password'}
                                    type={`password`}
                                    name={`password`}
                                    onChange={(e) => { handleChange(e); setTouched({ ...touched, [e.target.name]: true }) }}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Пароль"
                                />
                                {touched.password && errors.password && <span className={'name-input-error form__input-error'}>{errors.password}</span>}
                                {console.log(touched)}
                            </fieldset>
                            <span className="register__error">{registerError}</span>
                            <button
                                disabled={!isValid || !dirty}
                                type={`submit`}
                                className={(isValid && dirty) ? "form__button form__button_type_register" : " form__button form__button_type_register form__button_invalid"}
                            >Зарегистрироваться</button>
                        </form>
                    )}
                </Formik>
                <div className="register__links">
                    <p className="register__answer">Уже зарегистрированы?</p>
                    <Link className="register__link" to="/signin" onClick={handleClearErrors}>Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;
