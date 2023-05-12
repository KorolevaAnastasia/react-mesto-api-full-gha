import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block">
          <div className="profile__overlay"
               onClick={props.onEditAvatar}>
          </div>
          <img className="profile__avatar"
               src={currentUser.avatar}
               alt={currentUser.name} />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button aria-label="Редактировать"
                    type="button"
                    className="profile__edit-button"
                    onClick={props.onEditProfile}/>
          </div>
        <p className="profile__job">{currentUser.about}</p>
        </div>
        <button aria-label="Добавить"
                type="button"
                className="profile__card-button"
                onClick={props.onAddPlace}/>
      </section>
      <section className="cards">
        {Array.isArray(props.cards) ? props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDeleteClick={props.onCardDeleteClick}
          />
        )) : ''}
      </section>
    </main>
  );
}

export default Main;
