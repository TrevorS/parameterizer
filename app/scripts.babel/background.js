'use strict';

const storage = new Storage(chrome.storage.local);
const icon = new Icon(chrome.browserAction);

let extensionActive = true;

storage.isActive((isActive) => {
  extensionActive = isActive;

  icon.setActive(isActive);
});

const iconHandler = () => {
  storage.toggleActive((isActive) => {
    extensionActive = isActive;

    icon.setActive(isActive);
  });
};

const requestHandler = (_request) => {
  if (!extensionActive) {
    return;
  }

  const request = new Request(_request);

  storage.patterns((patterns) => {
    let matches = 0;

    patterns.forEach((pattern) => {
      if (request.matches(pattern.regex, pattern.queryParameters)) {
        const newUrl = request.addQueryParameters(pattern.queryParameters);

        chrome.tabs.update(request.tabId, { url: newUrl.href });

        matches++;
      }
    });

    icon.setMatches(matches);
  });
};

chrome.webRequest.onBeforeRequest.addListener(requestHandler,
	{ urls: ['<all_urls>'] }, ['blocking']);

chrome.browserAction.onClicked.addListener(iconHandler);
