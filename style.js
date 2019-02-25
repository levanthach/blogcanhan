(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
// scroll top
$(document).ready(function(){
 
    // hide #go-top first
    $("#go-top").hide();
 
    // fade in #go-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 90) {
                $('#go-top').fadeIn();
            } else {
                $('#go-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#go-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
 
});
// show & hide menu fixed-top
jQuery(document).ready(function($) {   
  //selector đến menu cần làm việc
  var TopFixMenu = $(".navbar-fixed-top");
  // dùng sự kiện cuộn chuột để bắt thông tin đã cuộn được chiều dài là bao nhiêu.
  TopFixMenu.hide();
    $(window).scroll(function(){
    // Nếu cuộn được hơn 150px rồi
        if($(this).scrollTop()>100){
      // Tiến hành show menu ra   
        TopFixMenu.show();
        }else{
      // Ngược lại, nhỏ hơn 150px thì hide menu đi.
            TopFixMenu.hide();
        }}
    )
})

$(document).ready(function(){
  $('body').scrollspy({target: ".navbar", offset: 50});   
});

$('document').ready(function(){
	 $('.mouse').click(function () {
            $('body,html').animate({
                scrollTop: 450
            }, 800);
            return false;
        });
});
$(document).ready(function() {
	var typed = new Typed('#typist-element', {
		strings: ["Front End Developer", "Creative Lover", "Blogger", "Photographer", "Writer."],
		typeSpeed: 100,
		loop:true
	});
});
