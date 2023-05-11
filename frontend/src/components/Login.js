import React, {useState} from 'react';
import AuthForm from "./AuthForm";

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <AuthForm
      name="sign-in"
      onSubmit={handleSubmit}
      title="Вход"
      email={email}
      onEmailChange={handleChangeEmail}
      password={password}
      onPasswordChange={handleChangePassword}
      buttonText="Войти"
      isRegister={false}
    />
  )

}

export default Login;
