// Copyright (c) 2017 Peter Varney. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function loadOptions() {
	chrome.storage.sync.get(
		['epm_url'], 
		function(items) {
			document.getElementById('epm_url').value = items.epm_url || 'http://epm/PWA';
		}
	);
}

function storeOptions() {
	var epm_url = document.getElementById('epm_url').value;
	chrome.storage.sync.set(
		{
		'epm_url': epm_url,
		}, 
		function() {
			console.log('Options Saved');
		}
	);
}

window.onload = function() {
  loadOptions();

  document.getElementById('epm_url').onchange = storeOptions;

}