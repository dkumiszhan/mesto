export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const data = {};
    console.log("called getUserInfo");
    console.log(this._description.textContent);
    data.name = this._name.textContent;
    data.description = this._description.textContent;
    return data;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
