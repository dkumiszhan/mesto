export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

  renderItems(items) {
    items
      .slice()
      .reverse()
      .forEach((item) => {
        this.addItem(item);
      });
  }
}
