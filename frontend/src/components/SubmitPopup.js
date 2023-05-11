import React from 'react';
import PopupWithForm from './PopupWithForm';

function SubmitPopup(props) {
  return(
    <PopupWithForm
      title={props.title}
      name={props.name}
      buttonText={props.buttonText}
      loadingButtonText={props.loadingButtonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={props.onSubmit}
      isLoading={props.isLoading}
    />
  )
}

export default SubmitPopup;
