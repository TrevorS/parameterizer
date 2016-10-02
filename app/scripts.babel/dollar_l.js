class DollarL {
  constructor(_document) {
    this.document = _document || document;
  }

  byId(id) {
    return this.document.getElementById(id);
  }

  addOptionToSelect(select, textContent, value) {
    const elm = this.document.createElement('option');

    elm.textContent = textContent;
    elm.value = value;

    select.appendChild(elm);
  }

  refreshOptionsOnSelect(select, list, textField) {
    select.innerHTML = "";

    list.forEach((item) => this.addOptionToSelect(select, item[textField], item));
  }

  getSelected(select) {
    return select.options[select.selectedIndex];
  }
}
