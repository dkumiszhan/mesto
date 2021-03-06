export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

    // this._headers = {
    //   "Content-type": "application/json",
    //   authorization: this._token,
    // };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    //console.log(cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
      //   body: JSON.stringify({
      //     //   this.getUserInfo()
      //     //   .then((data) => {
      //     //       name: data.name;
      //     //       about: data.about:
      //     //   })
      //     name: "Marie Skłodowska Curie",
      //     about: "Physicist and Chemist",
      //   }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
      //body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      return this._getResponseData(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
      //body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
