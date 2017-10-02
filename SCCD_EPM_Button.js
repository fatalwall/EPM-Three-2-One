/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Change-Helper
 */ 


var AddToEPM = function() {
	'use strict';

	return {
		 /**
         * Buttons Click Action
         */
		'Action': function () {
			console.log('AddToEPM.Action');
			console.log('Field Value:' + getFieldText('mxf4d1d458'));
			if (getFieldText('mxf4d1d458') != ""){
				chrome.storage.sync.get(
					['epm_url'], 
					function(items) {
						var epm_url= items.epm_url  || 'http://epm/PWA';
						epm_url = epm_url + '/_layouts/PWA/Statusing/AddTask.aspx?mode=1&Incident=' + getFieldText('mxf4d1d458');
						console.log(epm_url);
						//chrome.tabs.create({url:epm_url});
						window.open(epm_url, '_blank');
					}
				);
			}else{
				 alert("Unable to process as you are not on an Incident Record page.");
			};
		},
		
		 /**
         * Adds a Text Box to accept an IN as input.
         */
        'Add': function () {
			var SCCD = document.getElementById("mxca49cfc5_1");
			var UI = SCCD.getElementsByTagName("ul")[0]

			
			var EPMTimeLI = document.createElement("li");
			EPMTimeLI.setAttribute("role", "presentation");
			EPMTimeLI.setAttribute("ctype", "toolbarbutton");

			var EPMTimeA = document.createElement("a");
			EPMTimeA.setAttribute("role", "button");
			EPMTimeA.setAttribute("ctype", "toolbarbutton");
			//EPMTimeA.setAttribute("href", "javascript:sendEvent('EmailChangeOwner','EmailChangeOwner','')");
			EPMTimeA.setAttribute("onkeydown", "itemAKey(event,this)");
			EPMTimeA.setAttribute("onfocus", "appendClass(this,'onhover')");
			EPMTimeA.setAttribute("onblur", "removeClass(this,'onhover')");
			EPMTimeA.setAttribute("class", "on");
			EPMTimeA.setAttribute("title", "Add to EPM Time Sheet");
			EPMTimeA.addEventListener("click", this.Action, false);

			var EPMTimeButton = document.createElement("img");
			EPMTimeButton.setAttribute("src", chrome.extension.getURL("theme/icon16.png"));
			EPMTimeButton.setAttribute("alt", "Add to EPM Time Sheet");
			EPMTimeButton.setAttribute("title", "Add to EPM Time Sheet");
			EPMTimeButton.setAttribute("role", "presentation");
			EPMTimeButton.setAttribute("height", "22");
			EPMTimeButton.setAttribute("width", "22");
			//EPMTimeButton.addEventListener("click", this.Action, false);

			//Add elements
			EPMTimeA.appendChild(EPMTimeButton);
			EPMTimeLI.appendChild(EPMTimeA);
			UI.appendChild(EPMTimeLI);
        }
		
	};
	 
};






