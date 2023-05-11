import React, {useState} from 'react';
import AuthForm from "./AuthForm";

function Register(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <AuthForm
      name="sign-up"
      onSubmit={handleSubmit}
      title="Регистрация"
      email={email}
      onEmailChange={handleChangeEmail}
      password={password}
      onPasswordChange={handleChangePassword}
      buttonText="Зарегистрироваться"
      isRegister={true}
    />
  );

}

export default Register;
