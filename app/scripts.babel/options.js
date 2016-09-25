'use strict';

const storage = new Storage(chrome.storage.local);
const $l = new DollarL();

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

const selects = {
  patterns: $l.byName('patterns'),
  queryParameters: $l.byName('query_parameters'),
};

const refreshPatterns = (patterns) =>
  $l.refreshOptionsOnSelect(selects.patterns, patterns, 'name');

const refreshQueryParameters = (queryParameters) =>
  $l.refreshOptionsOnSelect(selects.queryParameters, queryParameters, 'key');

buttons.addPattern.addEventListener('click', () => {
  const name = inputs.name.value;
  const regex = inputs.regex.value;

  const pattern = new Pattern(name, regex, queryParameters);

  storage.addPattern(pattern, () => {
    storage.patterns((patterns) => {
      refreshPatterns(patterns);
    });
  });
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

const queryParameters = [];

storage.patterns((details) => {
  refreshPatterns(details);
});
