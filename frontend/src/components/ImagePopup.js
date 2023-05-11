function ImagePopup(props) {
  return (
    <div className={`popup popup_background popup-card-open ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onOverlayClick}/>
      <div className="popup__card-container">
        <button type="button"
                aria-label="Закрыть"
                className="popup__close-button"
                onClick={props.onClose}/>
        <figure className="popup__card-block">
          <img className="popup__card-img" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : "Изображение"} />
            <figcaption className="popup__card-description">{props.card ? props.card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
