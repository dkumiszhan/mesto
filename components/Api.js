export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      authorization: this._token,
    };
    this._mainUrl = "https://mesto.nomoreparties.co/v1/cohort-43";
  }

  getInitialCards() {
    return fetch(this._url, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  addCard(data) {
    return fetch(this._url, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  deleteCard(cardId) {
    console.log(cardId);
    return fetch(`${this._url}/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-43/users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  updateUserInfo(data) {
    fetch("https://mesto.nomoreparties.co/v1/cohort-43/users/me", {
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  putLike(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
      //body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
      //body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
}
