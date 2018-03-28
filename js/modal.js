'use strict';

(function($) {

	$.fn.modalWindow = function(){
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

			$('body').append('<div id="modal_form"><div class="circle"><span id="modal_close">X</span></div><div class="correct"><p class="title_result">Your result is ' + result +'</p></div><button class="btn btn_small" id="btn_close">Try again</button></div>');
			$('body').append('<div id="overlay"></div>');
			

			$('#overlay').fadeIn(500, function(){
				$('#modal_form').css('display', 'block').animate({
					opacity: 1,
					top: '50%'
				}, 300);
			});
		
			function hideModal(e) {

				$('#modal_form').animate({
					opacity: 0,
					top: '45%'
					}, 200, function(){
						$(this).css('display', 'none');
						$('#overlay').fadeOut(400);
					}
				);

				setTimeout(function() {
					result = 0;
					$('#modal_form').remove();
					$('#overlay').remove();
				}, 1000);

				for (var i = 0; i < answer.length; i++) {
					answer[i].checked = false;
				}

				
			};

			$('#modal_close, #overlay, #btn_close').on('click',hideModal);

		};

		$('#check').on('click',showModal);
	
	}

	return this;

})(jQuery);
