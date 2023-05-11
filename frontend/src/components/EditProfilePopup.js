import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      form={'profile'}
      buttonText={'Сохранить'}
      loadingButtonText={'Сохранение...'}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input id="name-input"
               name="name"
               className="popup__input popup__input_type_name"
               type="text"
               placeholder="Имя"
               required
               minLength="2" maxLength="40"
               value={name ?? ''}
               onChange={handleNameChange}/>
        <span className="name-input-error popup__error"/>
      </label>
      <label className="popup__field">
        <input id="job-input"
               name="about"
               className="popup__input popup__input_type_job"
               type="text"
               placeholder="Род деятельности"
               required
               minLength="2" maxLength="200"
               value={description ?? ''}
               onChange={handleDescriptionChange}/>
        <span className="job-input-error popup__error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
