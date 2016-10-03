'use strict';

const storage = new Storage(chrome.storage.local);
const $l = new DollarL();

const inputs = {
  name: $l.byId('name'),
  regex: $l.byId('regex'),
  key: $l.byId('key'),
  value: $l.byId('value'),
};

const buttons = {
  addQueryParameter: $l.byId('add_query_parameter'),
  removeQueryParameter: $l.byId('remove_query_parameter'),
  addPattern: $l.byId('add_pattern'),
  removePattern: $l.byId('remove_pattern'),
};

const selects = {
  patterns: $l.byId('patterns'),
  queryParameters: $l.byId('query_parameters'),
};

const refreshPatterns = (patterns) =>
  $l.refreshOptionsOnSelect(selects.patterns, patterns, 'name');

const refreshQueryParameters = (queryParameters) =>
  $l.refreshOptionsOnSelect(selects.queryParameters, queryParameters, 'key');

buttons.addPattern.addEventListener('click', () => {
  const name = inputs.name.value;
  const regex = inputs.regex.value;

  const pattern = new Pattern(name, regex, queryParameters);

  storage.addPattern(pattern, (updatedPatterns) => {
    refreshPatterns(updatedPatterns);
  });
});

buttons.removePattern.addEventListener('click', () => {
  const patternName = $l.getSelected(selects.patterns).text;

  storage.removePattern(patternName, (updatedPatterns) => {
    refreshPatterns(updatedPatterns);
  });
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

selects.patterns.addEventListener('click', (event) => {
  storage.patterns((patterns) => {
    const pattern = patterns.find((pattern) =>
      pattern.name === event.toElement.innerHTML);

    if (!pattern) {
      return;
    }

    inputs.name.value = pattern.name;
    inputs.regex.value = pattern.regex;

    inputs.key.value = null;
    inputs.value.value = null;

    queryParameters.length = 0;
    queryParameters.push(...pattern.queryParameters);

    refreshQueryParameters(queryParameters);
  });
});

selects.queryParameters.addEventListener('click', (event) => {
  const queryParameter = queryParameters.find((queryParameter) =>
    queryParameter.key === event.toElement.innerHTML);

  if (!queryParameter) {
    return;
  }

  inputs.key.value = queryParameter.key;
  inputs.value.value = queryParameter.value;
});

const queryParameters = [];

storage.patterns((details) => {
  refreshPatterns(details);
});
