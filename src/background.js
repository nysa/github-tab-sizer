'use strict';

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
  var hasExtGo = /\.go/;

  if (!hasParamTs.test(url) && hasExtGo.test(url))
    return {redirectUrl: addTabSizeParam(url, 2)};
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
