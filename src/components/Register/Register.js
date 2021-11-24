import React, { useCallback } from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
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


    function handleSubmit(e) {
        e.preventDefault()
        props.onRegister({ email: values.email, name: values.name, password: values.password });
    }
    function handleChangeInput(event) {
        handleChange(event);

    }
    function handleClearErrors() {
        props.clearErrors();
        resetForm()
    }
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    return (
        <section className={'register'}>
            <Link to="/" className="register__logo" />
            <h2 className="register__title">Добро пожаловать!</h2>
            <div className={`register__container`}>
                <form className={`form form_type_register`} name={`form-register`} onSubmit={handleSubmit}>
                    <fieldset className="form__input-container form__input-container_type_register">
                        <p className="form__text">Имя</p>
                        <input className="form__input form__input-register form__input_type_username" type="name" name="name" placeholder="Имя"
                            minLength="2" maxLength="30" id="name-input" value={values.name} onChange={handleChangeInput} pattern="[а-яА-Яa-zA-ZёË\- ]{1,}" required />
                        <span className="name-input-error form__input-error">{errors.name}</span>
                        <p className="form__text">E-mail</p>
                        <input className="form__input form__input-register form__input_type_email" type="email" name="email"
                            placeholder="E-mail" id="email-input" value={values.email} onChange={handleChangeInput} required />
                        <span className="email-input-error form__input-error">{errors.email}</span>
                        <p className="form__text">Пароль</p>
                        <input className="form__input form__input-register form__input_type_password" type="password" name="password"
                            placeholder="Пароль" id="password-input"  value={values.password} onChange={handleChangeInput} required />
                        <span className="password-input-error form__input-error">{errors.password}</span>
                    </fieldset>
                    <span className="register__error">{props.registerError}</span>
                    <button className={isValid ? "form__button form__button_type_register" : " form__button form__button_type_register form__button_invalid"} type="submit" aria-label="submit" disabled={!isValid}>Зарегистрироваться</button>
                </form>
                <div className="register__links">
                    <p className="register__answer">Уже зарегистрированы?</p>
                    <Link className="register__link" to="/signin" onClick={handleClearErrors}>Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;
