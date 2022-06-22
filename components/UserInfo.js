export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatarContainer = document.querySelector(
      ".profile__avatar-container"
    );
  }

  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.description = this._description.textContent;
    return data;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  updateAvatarNode(link) {
    // document.querySelector(".profile .profile__avatar").src = link;
    this._avatarContainer.style.backgroundImage = `url(${link})`;
  }
}
