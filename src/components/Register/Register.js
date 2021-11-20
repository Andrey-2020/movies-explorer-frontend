import React from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
    return (
        <section className={'register'}>
            <Link to="/" className="register__logo" />
            <h2 className="register__title">Добро пожаловать!</h2>
            <div className={`register__container`}>
                <form className={`form form_type_register`} name={`form-register`} >
                    <fieldset className="form__input-container form__input-container_type_register">
                        <p className="form__text">Имя</p>
                        <input className="form__input form__input-register form__input_type_username" type="email" name="username" placeholder="Имя"
                            minLength="2" maxLength="30" id="username-input" /*value={email} onChange={handleEmailChange}*/ required />
                        <span className="username-input-error form__input-error"></span>
                        <p className="form__text">E-mail</p>
                        <input className="form__input form__input-register form__input_type_email" type="password" name="email"
                            placeholder="E-mail" id="email-input" /*value={password} onChange={handlePasswordChange}*/ required />
                        <span className="email-input-error form__input-error"></span>
                        <p className="form__text">Пароль</p>
                        <input className="form__input form__input-register form__input_type_password" type="password" name="password"
                            placeholder="Пароль" id="password-input" required />
                        <span className="password-input-error form__input-error"></span>
                    </fieldset>
                    <button className="form__button form__button_type_register" type="submit" aria-label="submit">Зарегистрироваться</button>
                </form>
                <div className="register__links">
                    <p className="register__answer">Уже зарегистрированы?</p>
                    <Link className="register__link" to="/signin">Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;
