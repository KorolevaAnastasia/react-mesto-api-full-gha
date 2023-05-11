import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  return(
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      buttonText={'Сохранить'}
      loadingButtonText={'Сохранение...'}
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input id="avatar-input"
               name="avatar"
               className="popup__input popup__input_type_avatar"
               type="url"
               placeholder="Ссылка на картинку"
               required
               ref={ref}/>
        <span className="avatar-input-error popup__error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
