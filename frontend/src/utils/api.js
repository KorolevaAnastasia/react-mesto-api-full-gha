const baseUrl = 'https://api.mesto-akoroleva.nomoredomains.monster';

export function getInitialCards() {
  return request(
    baseUrl + '/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  });
}

export function getUserProfileData() {
  return request(
    baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
}

export function updateUserProfileData(userData) {
  return request(
    baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
}

export function changeUserProfileAvatar(avatarData){
  return request(
    baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: avatarData.avatar,
      })
    });
}

export function addCard(cardData){
  return request(
    baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    });
}

export function removeCard(cardId){
  return request(
    baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    });
}

export function likeCard(cardId){
  return this._request(
    baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    });
}

export function dislikeCard(cardId){
  return this._request(
    this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    });
}

export function changeLikeCardStatus(cardId, isLiked){
  if (isLiked) {
    return this.dislikeCard(cardId);
  } else {
    return this.likeCard(cardId);
  }
}

function checkStatus(res) {
  if (res.ok)
    return res.json();

  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkStatus);
}

