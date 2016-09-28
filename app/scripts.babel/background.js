'use strict';

const storage = new Storage(chrome.storage.local);

const requestHandler = (_request) => {
  const request = new Request(_request);

  storage.patterns((patterns) => {
    patterns.forEach((pattern) => {
      if (request.matches(pattern.regex, pattern.queryParameters)) {
        const newUrl = request.addQueryParameters(pattern.queryParameters);

        chrome.tabs.update(request.tabId, { url: newUrl.href });
        chrome.browserAction.setBadgeText({ text: '!' });
      }
    });
  });
};

chrome.webRequest.onBeforeRequest.addListener(requestHandler,
	{ urls: ['<all_urls>'] }, ['blocking']);
