// Simple JavaScript Templating
// John Resig – http://ejohn.org/ – MIT Licensed
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we’re getting a template, or if we need to
    // load the template – and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t") 
          .replace(/((^|%>)[^\t]*)’/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
'use strict';

(function ($) {

	$.fn.modalWindow = function () {
		var modal = $('<div id="modal_form"></div>');
		var overlay = $('#overlay');
		var answer;
		var correct = [];
		var result = 0;

		function showModal(e) {
			e.preventDefault();
			answer = $('input:checked');

			for (var i = 0; i < formLocalStorage.questions.length; i++) {
				correct[i] = formLocalStorage.questions[i].correct;
				if ($(answer[i]).attr('id') == correct[i]) {
					result++;
				}
			}
			$('body').append('<div id="modal_form">\n\t\t\t\t\t<div class="circle">\n\t\t\t\t\t\t<span id="modal_close">X</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="correct">\n\t\t\t\t\t\t<p class="' + (result > 2 ? 'title_result__green' : 'title_result') + ' ">Your result is ' + result + '</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="btn btn_small" id="btn_close">Try again</button>\n\t\t\t\t</div>');
			$('body').append('<div id="overlay"></div>');
			$('#overlay').fadeIn(500, function () {
				$('#modal_form').css('display', 'block').animate({
					opacity: 1,
					top: '50%'
				}, 300);
			});

			function hideModal(e) {
				$('#modal_form').animate({
					opacity: 0,
					top: '45%'
				}, 200, function () {
					$(this).css('display', 'none');
					$('#overlay').fadeOut(400);
				});
				setTimeout(function () {
					result = 0;
					$('#modal_form').remove();
					$('#overlay').remove();
				}, 1000);

				for (var i = 0; i < answer.length; i++) {
					answer[i].checked = false;
				}
			};
			$('#modal_close, #overlay, #btn_close').on('click', hideModal);
		};

		$('#check').on('click', showModal);
	};
	return this;
})(jQuery);

///localStorage
'use strict';

var form = {
	questions: [{
		'name': 'q0',
		'title': '1. What is HTML?',
		'id': ['q0a0', 'q0a1', 'q0a2'],
		'answers': ['Hypertext Markup Language', 'Objective Programming Language', 'How To Make Landingpage'],
		'correct': 'q0a0'
	}, {
		'name': 'q1',
		'title': '2. What is CSS?',
		'id': ['q1a0', 'q1a1', 'q1a2'],
		'answers': ['Censor Sold Solar System', 'Central Sugar Station', 'Cascading Style Sheets'],
		'correct': 'q1a2'
	}, {
		'name': 'q2',
		'title': '3. What is JavaScript?',
		'id': ['q2a0', 'q2a1', 'q2a2'],
		'answers': ['Analog of Java with more functions', 'High-level interpreted programming language', 'Language of Javas in Star Wars'],
		'correct': 'q2a1'
	}]

	// write our variable into localStorage
};try {
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
$(document).ready(function () {
	$('#check').modalWindow();
});
