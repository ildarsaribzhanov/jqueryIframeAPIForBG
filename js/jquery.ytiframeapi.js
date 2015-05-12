;(function ($, window) {

	$.fn.YTIframeApi = function(options){

		options = $.extend({
			classVideo  : 'video',
			ratio       : 16/9,
			attr        : 'data-video'

		}, options);

		var make = function(){

			window.onYouTubeIframeAPIReady = function() {
				initialize_video();
			};

			// Инициализация блока с видео
			function initialize_video(){

				$(options.classVideo).each(function() {
					var vid = $(this).attr(options.attr);
					bid = 'video-' + vid;

					$(this).append('<div class="main_iframe" id="'+bid+'" style="position: absolute;"></div>')

					new YT.Player(bid, {
						width: 400,
						height: Math.ceil(400 / (16 / 9) ),
						videoId: vid,
						playerVars: {
							controls: 0,
							showinfo: 0,
							modestbranding: 1,
							wmode: 'transparent',
							loop: 1,
							playlist: vid
						},
						events: {
							'onReady': onPlayerReady
						}
					});
				})
			}
		};

		// При запуске видео установим размеры, выключим звук и запустим видео
		window.onPlayerReady = function(e) {
			resize();
			e.target.mute();
			e.target.playVideo();
		};


		// Установка размеров блока
		function resize() {
			$(options.classVideo).each(function() {
				var width = $(this).width(),
					height = $(this).height(),

					pWidth,     // player width, to be defined
					pHeight,    // player height, tbd
					this_block = $(this).find('.main_iframe');


				// Если высота блока меньше чем ширина, высилим новую ширину и отцентрируем блок
				if (width / options.ratio < height) {
					pWidth = Math.ceil(height * options.ratio);
					this_block.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0});
				} else {
					pHeight = Math.ceil(width / options.ratio);
					this_block.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 2});
				}
			})
		}


		// При изменении размера окна, изменяем размер видео
		$(window).resize(function() {
			resize();
		})




		return make();
	};
})(jQuery, window);