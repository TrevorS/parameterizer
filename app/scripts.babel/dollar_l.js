class DollarL {
  constructor(_document) {
    this.document = _document || document;
  }

  byId(id) {
    return this.document.getElementById(id);
  }

  byName(name) {
    return this.document.getElementsByName(name)[0];
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
}
