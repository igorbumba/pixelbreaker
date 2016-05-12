var webJS = {
	common: {}
};

webJS.common = (function (window, document) {

	function pixelBreaker() {

		var $score = $('#score');
		var $number = $('#scoreno');
		var $title = $('#title');
		var current_score = 0;

		function appendDiv(el) {

			var el_width = el.width();
			var el_height = el.height();

			var color1 = Math.floor(Math.random() * 16777215).toString(16);
			var color2 = Math.floor(Math.random() * 16777215).toString(16);

			if (el_width <= el_height) {
				el.append('<i class="ne top" style="background-color: #' + color1 + '"></i><i class="ne bottom" style="background-color: #' + color2 + '"></i>');
			} else {
				el.append('<i class="ne left" style="background-color: #' + color1 + '"></i><i class="ne right" style="background-color: #' + color2 + '"></i>');
			}
		}

		$(document).on('mousedown', '.ne', function (e) {
			if (e.target == e.currentTarget) {
				var $this = $(this);
				if ($this.width() > 1 || $this.height() > 1) {
					appendDiv($this);
					current_score = current_score + 1;
					$number.html(current_score);
				}
			}
		});

		$('body').keyup(function (e) {
			if (e.keyCode == 32) {
				console.log('jesam');
				if ($score.hasClass('opened')) {
					$score.removeClass('opened').fadeOut(300);
					$title.fadeOut(300);
				}
				else {
					$score.fadeIn(300).addClass('opened');
					$title.fadeIn(300);
				}
			}
		});


	}

	return {
		pixelBreaker: pixelBreaker
	};

})(window, document);

$(function () {
	webJS.common.pixelBreaker();
});