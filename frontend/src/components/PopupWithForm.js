import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onOverlayClick}/>
      <div className="popup__container">
        <button type="button"
                aria-label="Закрыть"
                className="popup__close-button"
                onClick={props.onClose}/>
        <h3 className="popup__header">{props.title}</h3>
        <form name={props.name} onSubmit={props.onSubmit} className={`popup__form popup__form-${props.name}`}>
          {props.children}
          <button type="submit" aria-label="Сохранить"
                  className="popup__save-button popup__button"
                  value="Сохранить">
            {props.isLoading ? props.loadingButtonText : props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
