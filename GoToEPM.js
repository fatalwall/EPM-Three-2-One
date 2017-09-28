/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/EPM-Three-2-One
 */ 

chrome.browserAction.onClicked.addListener(function(tab) {
	OpenEPM_NewTab();
});

function OpenEPM_NewTab() {
	chrome.storage.sync.get(
		['epm_url'], 
		function(items) {
			var epm_url= items.epm_url || 'http://epm/PWA';
			chrome.tabs.create({url:epm_url});
		}
	);

}

