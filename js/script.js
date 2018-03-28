//localStorage
'use strict'

var form = {

	questions: [{
		'name': 'q0',
		'title': '1. What is HTML?',
		'id':['q0a0','q0a1','q0a2'],
		'answers': ['Hypertext Markup Language', 'Objective Programming Language', 'How To Make Landingpage'],
		'correct': 'q0a0'
	}, {
		'name': 'q1',
		'title': '2. What is CSS?',
		'id':['q1a0', 'q1a1', 'q1a2'],
		'answers': ['Censor Sold Solar System', 'Central Sugar Station', 'Cascading Style Sheets'],
		'correct': 'q1a2'
	}, {
		'name': 'q2',
		'title': '3. What is JavaScript?',
		'id':['q2a0','q2a1', 'q2a2'],
		'answers': ['Analog of Java with more functions', 'High-level interpreted programming language', 'Language of Javas in Star Wars'],
		'correct': 'q2a1'
	}]
}

// write our variable into localStorage

try {

	var formStr = JSON.stringify(form);
	localStorage.setItem('programTest', formStr);

} catch (e) {

	alert(e);
}

// get variable from localStorage

try {
	var formLocalStorage = localStorage.getItem('programTest');
	formLocalStorage = JSON.parse(formStr);

} catch (e) {

	alert(e);
}

// Template

var html = $('#test').html();
var content = tmpl(html, formLocalStorage);
$('body').append(content);

// Show modal


$(document).ready(function(){
	$('#check').modalWindow();
});