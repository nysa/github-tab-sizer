'use strict';

var $form;
var $tabSize;

function init() {
  $form = document.getElementById('form');
  $tabSize = document.getElementById('tab-size');

  loadOptions();
  form.addEventListener('submit', saveOptions);
}

function saveOptions(e) {
  e.preventDefault();

  chrome.storage.sync.set({tabSize: $tabSize.value}, function() {
    console.log('Saved!');
  });
}

function loadOptions() {
  chrome.storage.sync.get({tabSize: 2}, function(items) {
    $tabSize.value = items.tabSize;
  });
}

document.addEventListener('DOMContentLoaded', init);
