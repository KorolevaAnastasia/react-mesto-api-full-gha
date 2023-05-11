import React from "react";
import {Link} from "react-router-dom";

function AuthForm(props){
  return(
    <div className="auth">
      <form name={props.name} className="auth__form" onSubmit={props.onSubmit} noValidate>
        <h3 className="auth__header">{props.title}</h3>
        <label className="auth__field">
          <input id="email-input"
                 name="email"
                 className="auth__input"
                 type="email"
                 placeholder="Email"
                 required
                 minLength="2"
                 maxLength="200"
                 value={props.email}
                 onChange={props.onEmailChange}/>
          <span className="email-input-error auth__error"/>
        </label>
        <label className="auth__field">
          <input id="password-input"
                 name="password"
                 className="auth__input"
                 type="password"
                 placeholder="Пароль"
                 required
                 minLength="6"
                 maxLength="200"
                 autoComplete="new-password"
                 value={props.password}
                 onChange={props.onPasswordChange}/>
          <span className="password-input-error auth__error"/>
        </label>
        <button type="submit" aria-label={props.buttonText}
                className="auth__button">{props.buttonText}
        </button>
      </form>
      {props.isRegister && <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>}
    </div>
  )
}

export default AuthForm;
