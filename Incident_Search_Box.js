/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/EPM-Three-2-One
 */ 

function ISB_SetProject (ticket) {
	ticket= ticket.toUpperCase().replace("IN","");
	console.log('Function Set Project');
	var project = document.getElementById("ctl00_ctl00_PlaceHolderMain_PWA_PlaceHolderMain_idFormSectionTaskLocation_ctl01_ProjectDropdown");
	var projectText;
	for (i= project.options.length-1; i >= 0; i--) {
		var r = new RegExp('^[I,i]ncidents?(_|-)[0-9]{6}(_| - |-)[0-9]{6}$');
		projectText = project.options[i].text;
		if(r.test(projectText)){
			projectText = projectText.replace(" - ","_");
			projectText = projectText.replace("-","_");
			projectText = projectText.replace("-","_");
			projectText = projectText.trim();
			//console.log(projectText);
			var arr = projectText.split("_");
			if ((parseInt(arr[1]) <= parseInt(ticket)) && (parseInt(arr[2]) >= parseInt(ticket))){
				console.log(parseInt(arr[1]) + "<=" + parseInt(ticket) + " && " + parseInt(arr[2]) + ">=" + parseInt(ticket) + " = TRUE");
				console.log('RegExp Match:' + i + " Text:" + project.options[i].text);
				console.log('Project Ticket Match');
				if (project.value != project.options[i].value){
					project.value = project.options[i].value;
					project.dispatchEvent(new Event('change'));
				} else {
					//Project is set correctly so i can now set task
					ISB_SetTask(ticket);
				}
			}else{
				console.log(parseInt(arr[1]) + "<=" + parseInt(ticket) + " && " + parseInt(arr[2]) + ">=" + parseInt(ticket) + " = FALSE");
			}
		}else{
			//console.log('RegExp Fail:' + i + " Text:" + project.options[i].text);
		};
	}
	console.log('End Set Project');
};

function ISB_SetTask (ticket) {
	ticket= ticket.replace("IN","");
	console.log('Function Set Task');
	var task = document.getElementById("ctl00_ctl00_PlaceHolderMain_PWA_PlaceHolderMain_idFormSectionName_ctl00_TaskDropdown");
	var taskText;
	for (i= task.options.length-1; i >= 0; i--) {
		taskText = task.options[i].text;
		taskText = taskText.replace("IN","");
		taskText = taskText.replace("_","");
		taskText = taskText.replace(" - ","");
		taskText = taskText.replace("-","");
		taskText = taskText.trim();
		if (parseInt(taskText) == parseInt(ticket)){
			console.log('Task:' + taskText + ' Ticket:' + ticket + ' Match');
				if (task.value != task.options[i].value){
					task.value = task.options[i].value;
					task.dispatchEvent(new Event('change'));
				}else{
					var totalWorkRadio = document.getElementById("ctl00_ctl00_PlaceHolderMain_PWA_PlaceHolderMain_idFormSectionName_ctl00_totalWorkRadio");
					totalWorkRadio.checked  = true;
					var txtWork = document.getElementById("ctl00_ctl00_PlaceHolderMain_PWA_PlaceHolderMain_idFormSectionName_ctl00_txtWork");
					txtWork.value = ".5";
					console.log('Ready for Submit');
				}
		}
	}
	console.log('End Set Project');
};


var Incident_Search_Box = function() {
	'use strict';
	var IncidentSearch;

	return {
		
		/**
         * Reload value after page changes due to dropdown change
         */
		'Load': function () {
			if (typeof getVariableValue("Incident") === 'undefined'){
				chrome.storage.sync.get(
					['IN'], 
					function(items) {
						if (typeof items.IN != 'undefined' ) {
							console.log('Loading IN:' + items.IN);
							IncidentSearch.value = items.IN;
							IncidentSearch.dispatchEvent(new Event('change'));
						};
					}
				);
			} else {
				IncidentSearch.value = getVariableValue("Incident");
				IncidentSearch.dispatchEvent(new Event('change'));
			};
		},
		
		/**
         * save value to prevent loss when dropdown changes causing the page to refresh
         */
		'Store': function () {
			var IN = IncidentSearch.value;
			console.log('Please store IN:' + IN);
			chrome.storage.sync.set(
				{
					'IN': IN,
				}, 
				function() {
					console.log('IN has been Stored');
				}
			);
		},
		
		 /**
         * Validate and process on validation.
         */
		'isValid': function () {
			var r = new RegExp('((^[I,i][N,n][5-9]{1}[0-9]{5}$)|(^[5-9]{1}[0-9]{5}$))');
			if(r.test(IncidentSearch.value)){
				IncidentSearch.style.backgroundImage= "url(" + chrome.extension.getURL("Options/valid.png")+")";
				ISB_SetProject(IncidentSearch.value);
				return true;
			}else{
				IncidentSearch.style.backgroundImage= "url(" + chrome.extension.getURL("Options/invalid.png")+")";
				return false;
			};
		},
		
		 /**
         * Adds a Text Box to accept an IN as input.
         */
        'Add': function () {
			 //alert("Incident_Search_Box");
			 	var table = document.getElementById("ctl00_ctl00_PlaceHolderMain_PWA_PlaceHolderMain_idFormSectionName_ctl00_NewAssnTable");
				var tr = table.getElementsByTagName("tr")[1];
				var td = tr.getElementsByTagName("td")[0];
				

				IncidentSearch = document.createElement("input");
				IncidentSearch.setAttribute("type", "text");
				IncidentSearch.setAttribute("id", "IN");
				IncidentSearch.setAttribute("name", "IN");
				IncidentSearch.setAttribute("pattern", "((^IN[5-9]{1}[0-9]{5}$)|(^[5-9]{1}[0-9]{5}$))");
				IncidentSearch.setAttribute("title", "Incident Number");
				IncidentSearch.setAttribute("placeholder", "IN######");
				IncidentSearch.setAttribute("autocomplete", "off");
				IncidentSearch.setAttribute("maxlength", "8");
				//IncidentSearch.required = true;

				IncidentSearch.addEventListener("keyup", this.Store, false);
				IncidentSearch.addEventListener("change", this.isValid, false);
				IncidentSearch.addEventListener("keyup", this.isValid, false);
				//Add elements
				td.appendChild(IncidentSearch);
				
				//Restore value if needed
				this.Load();
        }
		
	};
	 
};







