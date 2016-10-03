class DollarL {
  constructor(_document) {
    this.document = _document || document;
  }

  byId(id) {
    return this.document.getElementById(id);
  }

  addOptionToSelect(select, textContent, value) {
    const elm = this.createElement('option');

    elm.textContent = textContent;
    elm.value = value;

    select.appendChild(elm);
  }

  createElement(tagName) {
    return this.document.createElement(tagName);
  }

  refreshOptionsOnSelect(select, list, textField) {
    select.innerHTML = "";

    list.forEach((item) => this.addOptionToSelect(select, item[textField], item));
  }

  getSelected(select) {
    return select.options[select.selectedIndex];
  }
}
