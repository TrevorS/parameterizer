'use strict';

const $l = {
  byId: (id) =>
    document.getElementById(id),
  byName: (name) =>
    document.getElementsByName(name)[0],
  addOption: (select, textContent, value) => {
    const elm = document.createElement('option');

    elm.textContent = textContent;
    elm.value = value;

    select.appendChild(elm);
  },
};

const refreshOptions = (select, list, textField) => {
  select.innerHTML = "";

  list.forEach((item) => $l.addOption(select, item[textField], item));
};

const refreshPatterns = (patterns) =>
  refreshOptions(selects.patterns, patterns, 'name');

const refreshQueryParameters = (queryParameters) =>
  refreshOptions(selects.queryParameters, queryParameters, 'key');

const selects = {
  patterns: $l.byName('patterns'),
  queryParameters: $l.byName('query_parameters'),
};

const inputs = {
  name: $l.byName('name'),
  regex: $l.byName('regex'),
  key: $l.byName('key'),
  value: $l.byName('value'),
};

const buttons = {
  addQueryParameter: $l.byId('add_query_parameter'),
  removeQueryParameter: $l.byId('remove_query_parameter'),
  addPattern: $l.byId('add_pattern'),
  removePattern: $l.byId('remove_pattern'),
}

const patterns = [
  new Pattern('Test1'),
  new Pattern('Test2'),
];

refreshPatterns(patterns);

const queryParameters = [
  { key: 'Test3', value: 'Test4' },
  { key: 'Test5', value: 'Test6' },
];

refreshQueryParameters(queryParameters);

buttons.addPattern.addEventListener('click', () => {
  const name = inputs.name.value;
  const regex = inputs.regex.value;

  patterns.push(new Pattern(name, regex, queryParameters));

  refreshPatterns(patterns);
});

buttons.removePattern.addEventListener('click', () => {
  refreshPatterns(patterns);
});

buttons.addQueryParameter.addEventListener('click', () => {
  const key = inputs.key.value;
  const value = inputs.value.value;

  queryParameters.push({ key, value });

  refreshQueryParameters(queryParameters);
});

buttons.removeQueryParameter.addEventListener('click', () => {
  refreshQueryParameters(queryParameters);
});
