class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  checkToken(token){
    return this._request(this._url + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  registerUser(email, password){
    return this._request(this._url + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });
  }

  loginUser(email, password){
    return this._request(this._url + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });
  }

  _checkStatus(res) {
    if (res.ok)
      return res.json();

    return Promise.reject(`Ошибка Auth: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkStatus);
  }

}

const authApi = new AuthApi({
  baseUrl: 'https://api.mesto-akoroleva.nomoredomains.monster',
});

export default authApi;
