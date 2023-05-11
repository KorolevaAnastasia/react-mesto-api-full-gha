import React from "react";

function InfoTooltip(props){
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onOverlayClick}/>
      <div className="popup__container">
        <button type="button"
                aria-label="Закрыть"
                className="popup__close-button"
                onClick={props.onClose}/>
        <div className="tooltip__block">
          <div className={`tooltip__icon ${props.tooltipSuccess ? 'tooltip__icon_success' : 'tooltip__icon_rejected'}`}></div>
          <p className="tooltip__text">{props.tooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
