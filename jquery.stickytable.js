(function($){
	$.fn.stickytable = function(options){
		
		var settings = $.extend({},$.fn.stickytable.defaults, options);
		
		return this.each(function(index){
			var table = $(this);
			var fixedheader = $('<div class="header-fixed"></div>');
			var tableOffset = table.offset().top;
			var tableleft = table.offset().left;
			var tablewidth = table.width();
			var tableheight = table.height();

			if($('thead',table).length < 1) {
				if($('th',table).length > 0){
					$('th',table).eq(0).parent().wrap('<thead class="theader"></thead>');
					$('.theader',table).prependTo(table);
				} 
				
				else $('tr',table).eq(0).wrap('<thead></thead>');
			}

			var $header = $("thead", table).clone();
			var newTable = $('<table class="'+table.attr('class')+'"></table>');
			$header.appendTo(newTable);
			newTable.css('margin','0');

			fixedheader.css({
				'position':'fixed',
				'top':'0px',
				'display':'none',
				'left':tableleft+'px',
				'width':tablewidth+2+'px',
				'z-index': '103'
			});
			var $fixedHeader = fixedheader.append(newTable);

			table.find('th').each(function(index, valuee){
				//console.log($(this).width()+'px');
				$header.find('th').eq(index).css('width',$(this).width()+'px');
			});
			
			$(window).on("scroll", function() {
				var offset = $(this).scrollTop();
				tableOffset = table.offset().top;
				tablewidth = table.width();
				tableheight = table.height();
				if (offset >= tableOffset && $fixedHeader.is(":hidden") && offset < tableOffset+tableheight) {
					fixedheader.appendTo('body');
					$fixedHeader.fadeIn(100);
					table.addClass('stuck');
				}
				else if (offset < tableOffset || offset > tableOffset+tableheight-30) {
					$fixedHeader.fadeOut(150);
					table.removeClass('stuck');
				}
			});

		});
	}
	

	$.fn.stickytable.defaults = {
		
	}

})(jQuery);
