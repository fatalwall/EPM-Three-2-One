/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/EPM-Three-2-One
 */ 

function getVariableValue(Name)
{
	if (document.location.toString().indexOf(Name) != -1)	{
		return document.location.toString().split(Name + '=')[1].split('&')[0];
	} else {
		return undefined;
	}
}
function getFieldValue(Name)
{
	if (document.getElementById(Name) != undefined) {
		return document.getElementById(Name).value;
	} else {
		return undefined;
	}
}

function getFieldText(Name)
{
	var el = document.getElementById(Name);
	if (typeof el === undefined) {
		console.log('getFieldText - Undefined');
		return "";
	} else {
		try{
			console.log('getFieldText - Trying Text');
			return el.text || el.textContent || el.innerText || "";
		} catch(a) {
			try{
				console.log('getFieldText - Trying textContent');
				return el.textContent || el.innerText || "";
			} catch(b) {
				try{
					console.log('getFieldText - Trying innerText');
					return el.innerText || "";
				} catch(c) {
					console.log('getFieldText - Text value not found');
					return "";
				}
			}
		}
		
	}
}
