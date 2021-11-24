import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin, clearErrors, loginError, setLoginError }) {
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

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    function handleLogin(e) {
        e.preventDefault();
        onLogin({ email: values.email, password: values.password });
    }
    function handleClearErrors() {
        resetForm();
        clearErrors();
    }
    function handleChangeInput(e) {
        if (loginError.length > 0) {
            setLoginError("");
        }
        handleChange(e);

    }
    return (
        <section className="login">
            <Link to="/" className="login__logo"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="form form_type_login" name={`form-login`} onSubmit={handleLogin}>
                <fieldset className="form__input-container form__input-container_type_login">
                    <p className="form__text">E-mail</p>
                    <input className="form__input form__input-login form__input_type_email" type="email" name="email"
                        placeholder="E-mail" id="email-input" value={values.email} onChange={handleChangeInput} required />
                    <span className="email-input-error form__input-error">{errors.email}</span>
                    <p className="form__text">Пароль</p>
                    <input className="form__input form__input-login form__input_type_password" type="password" name="password"
                        placeholder="Пароль" id="password-input" value={values.password} onChange={handleChangeInput} required />
                    <span className="password-input-error form__input-error">{errors.password}</span>
                </fieldset>
                <span className="login__error">{loginError}</span>
                <button className={isValid ? "form__button form__button_type_login" : " form__button form__button_type_login form__button_invalid"} type="submit" aria-label="submit"  disabled={!isValid}>Войти</button>
            </form>
            <div className="login__links">
                <p className="login__answer">Ещё не зарегистрированы?</p>
                <Link className="login__link" to="/signup" onClick={handleClearErrors}>Регистрация</Link>
            </div>
        </section>
    )
};
export default Login;