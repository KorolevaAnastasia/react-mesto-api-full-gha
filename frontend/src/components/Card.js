import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDeleteClick(props.card);
  }

  return(
    <article className="card">
      {isOwn && <button type="button" aria-label="Удалить" className="card__delete-button" onClick={handleCardDelete}/>}
      <img className="card__img" src={props.link} alt={props.name} onClick={handleClick}/>
        <div className="card__group">
          <h2 className="card__name">{props.name}</h2>
          <div className="card__like-block">
            <button type="button" aria-label="Лайк" className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} onClick={handleLikeClick}/>
            <span className="card__like-counter">{props.likes}</span>
          </div>
        </div>
    </article>
  )
}

export default Card;
