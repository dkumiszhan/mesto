export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

  renderItems() {
    this._initialArray
      .slice()
      .reverse()
      .forEach((item) => {
        this.addItem(item);
      });
  }
}
