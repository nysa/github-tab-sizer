'use strict';

var $tabSize;
var $fileTypes;

function init() {
  $tabSize = document.getElementById('tab-size');
  $fileTypes = document.getElementById('file-types');

  loadOptions();
  $tabSize.addEventListener('change', saveOptions);
  $fileTypes.addEventListener('change', saveOptions);
}

function saveOptions(e) {
  var items = {
    tabSize: $tabSize.value,
    fileTypes: $fileTypes.value.trim().split(',')
  };

  chrome.storage.sync.set(items, function() {
    console.log('Saved!');
  });
}

function loadOptions() {
  var defaultItems = {
    tabSize: 2,
    fileTypes: []
  };

  chrome.storage.sync.get(defaultItems, function(items) {
    $tabSize.value = items.tabSize;
    $fileTypes.value = items.fileTypes;
  });
}

document.addEventListener('DOMContentLoaded', init);
