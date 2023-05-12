const test_token = localStorage.getItem('token');
console.log('api');
console.log(test_token);

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return this._request(
      this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    });
  }

  getUserProfileData() {
    return this._request(
      this._url + '/users/me', {
        method: 'GET',
        headers: this._headers
      });
  }

  updateUserProfileData(userData) {
    return this._request(
      this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      });
  }

  changeUserProfileAvatar(avatarData){
    return this._request(
      this._url + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarData.avatar,
        })
      });
  }

  addCard(cardData){
    return this._request(
      this._url + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      });
  }

  removeCard(cardId){
    return this._request(
      this._url + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      });
  }

  likeCard(cardId){
    return this._request(
      this._url + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      });
  }

  dislikeCard(cardId){
    return this._request(
      this._url + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      });
  }

  changeLikeCardStatus(cardId, isLiked){
    if (isLiked) {
      return this.dislikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  _checkStatus(res) {
    if (res.ok)
      return res.json();

    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkStatus);
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto-akoroleva.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
