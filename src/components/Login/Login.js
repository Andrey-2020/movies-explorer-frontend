import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {

    return (
        <section className="login">
            <Link to="/" className="login__logo"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="form form_type_login" name={`form-login`} >
                <fieldset className="form__input-container form__input-container_type_login">
                    <p className="form__text">E-mail</p>
                    <input className="form__input form__input-login form__input_type_email" type="password" name="email"
                        placeholder="E-mail" id="email-input" /*value={password} onChange={handlePasswordChange}*/ required />
                    <span className="email-input-error form__input-error"></span>
                    <p className="form__text">Пароль</p>
                    <input className="form__input form__input-login form__input_type_password" type="password" name="password"
                        placeholder="Пароль" id="password-input" required />
                    <span className="password-input-error form__input-error"></span>
                </fieldset>
                <button className="form__button form__button_type_login" type="submit" aria-label="submit">Войти</button>
            </form>
            <div className="login__links">
                <p className="login__answer">Ещё не зарегистрированы?</p>
                <Link className="login__link" to="/signup">Регистрация</Link>
            </div>
        </section>
    )
};
export default Login;