import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import logo from '../images/logo-white.svg';

function Header(props) {
  return (
    <header className="header">
      <div className="header__block">
        <img className="header__logo" src={logo} alt="Логотип Место"/>
        <Routes>
          <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
          <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
          {props.isLoggedIn && <Route exact path="/" element={
            <div className="header__profile">
              <p className="header__email">{props.userEmail}</p>
              <Link
                to="/sign-in"
                className="header__link header__link_logout"
                onClick={props.onLogout}
              >Выйти</Link>
            </div>}
          />}
        </Routes>
      </div>
    </header>
  )
}

export default Header;
