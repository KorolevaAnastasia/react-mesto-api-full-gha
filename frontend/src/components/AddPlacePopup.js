import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return(
    <PopupWithForm
      title={'Новое место'}
      name={'card'}
      buttonText={'Создать'}
      loadingButtonText={'Сохранение...'}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input id="card-input"
               name="name"
               className="popup__input popup__input_type_card"
               type="text"
               placeholder="Название"
               required
               minLength="2" maxLength="30"
               value={name ?? ''}
               onChange={handleNameChange}/>
        <span className="card-input-error popup__error"/>
      </label>
      <label className="popup__field">
        <input id="link-input"
               name="link"
               className="popup__input popup__input_type_link"
               type="url"
               placeholder="Ссылка на картинку"
               required
               value={link ?? ''}
               onChange={handleLinkChange}/>
        <span className="link-input-error popup__error"/>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
