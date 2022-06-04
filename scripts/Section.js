export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer(item);
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this.clear();
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  clear() {
    this._container.innerHTML = "";
  }
}
