'use strict';

var tabSize = 2;
var fileTypes = [];
var defaultItems = {
  tabSize: tabSize,
  fileTypes: fileTypes
};

/**
 * Returns a BlockingResponse object with a redirect URL if the request URL
 * matches a file type extension.
 *
 * @param {object} request
 * @return {object|undefined} the blocking response
 */
function requestInterceptor(request) {
  var url = request.url;
  var hasParamTs = /\?.*ts=/;
  var fileTypesRegex = new RegExp(fileTypes.map(function(ft) {
    return '\\' + ft.trim();
  }).join('|'), 'i');

  if (!hasParamTs.test(url) && fileTypesRegex.test(url))
    return {redirectUrl: addTabSizeParam(url, tabSize)};
}

/**
 * Returns a URL with the query param ts=size included.
 *
 * @param {string} url
 * @param {number} size
 * @return {string}
 */
function addTabSizeParam(url, size) {
  var urlWithTs = new Url(url);
  urlWithTs.query.ts = size;
  return urlWithTs.toString();
}

chrome.webRequest.onBeforeRequest.addListener(
  requestInterceptor,
  {urls: ['https://github.com/*']},
  ['blocking']
);

chrome.storage.sync.get(defaultItems, function(items) {
  tabSize = items.tabSize;
  fileTypes = items.fileTypes;
});

chrome.storage.onChanged.addListener(function(items) {
  if (typeof items.tabSize !== 'undefined')
    tabSize = items.tabSize.newValue;
  if (typeof items.fileTypes !== 'undefined')
    fileTypes = items.fileTypes.newValue;
});
