'use strict';

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

const requestHandler = (request) => {
  // patterns.forEach((pattern) => {
  //   if (request.url.match(pattern.regex)) {
  //     // add the query parameter
  //   }
  // });

  console.log('test');
  console.log('request', request);
	if (request.url === 'http://cnn.com/') {
		console.log(request);
	}
};

chrome.webRequest.onBeforeRequest.addListener(requestHandler,
	{ urls: ['<all_urls>'] }, ['blocking']);
