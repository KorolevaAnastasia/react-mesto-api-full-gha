import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import api from "../utils/api";
import authApi from "../utils/authApi";
import Login from "./Login";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setSubmitPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setUserInfo] = React.useState({});
  const [cards, setCards] = useState([]);
  const [cardRemove, setCardRemove] = React.useState({});
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltipPopupOpen ||
    isEditAvatarPopupOpen || selectedCard || isSubmitPopupOpen;
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authApi.checkToken(jwt).then(data => {
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/');
      }).catch(error => {
        console.log(error);
      })
    }

  }, [navigate])

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([api.getUserProfileData(), api.getInitialCards()]).then(([profileInfo, cards]) => {
        setUserInfo(profileInfo.data);
        setCards(cards.data);
      }).catch((err) => {
        console.error(err);
      })
    }
  }, [isLoggedIn])

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.code === 'Escape')
        closeAllPopups();
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
    }
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [isOpen]);

  function handleRegisterUser(email, password) {
    authApi.registerUser(email, password).then(data => {
        setIsInfoTooltip(true);
        navigate('/sign-in');
    }).catch(error => {
      setIsInfoTooltip(false);
      console.log(error);
    }).finally(() => {
      setIsInfoTooltipPopupOpen(true);
    });
  }

  function handleLoginUser(email, password) {
    authApi.loginUser(email, password).then(data => {
      localStorage.setItem('jwt', data.jwt);
      setIsLoggedIn(true);
      setUserEmail(email);
      navigate('/');
    }).catch(error => {
      setIsInfoTooltip(false);
      setIsInfoTooltipPopupOpen(true);
      console.log(error);
    });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setIsLoggedIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.removeCard(cardRemove._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardRemove._id && c));
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSubmitCardDelete(card) {
    setSubmitPopupOpen(true);
    setCardRemove(card);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.updateUserProfileData(userData).then((profileInfo) => {
      setUserInfo(profileInfo);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api.changeUserProfileAvatar(avatarData).then((profileAvatar) => {
      setUserInfo(profileAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlace(cardData) {
    setIsLoading(true);
    api.addCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOverlayClose() {
    closeAllPopups();
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSubmitPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleSubmitCardDelete}
              onClose={closeAllPopups}
              onOverlayClick={handleOverlayClose}
              cards={cards}/>
            }
          />
          <Route path="/sign-up" element={
            <Register onRegister={handleRegisterUser}/>
          }/>
          <Route path="/sign-in" element={
            <Login onLogin={handleLoginUser}/>
          }/>
          <Route path="/" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
          >
        </EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
        />

        <SubmitPopup
          title={'Вы уверены?'}
          name={'card-remove'}
          buttonText={'Да'}
          loadingButtonText={'Удаление...'}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          name="tooltip"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClose}
          tooltipSuccess={isInfoTooltip}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
