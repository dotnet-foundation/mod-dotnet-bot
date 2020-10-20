'use strict';

class Viewport {

	constructor( options ) {
		this.events();
	}

	events() {
		var items = document.querySelectorAll('*[data-animate-in], *[data-detect-viewport]'),
            pageOffset = window.pageYOffset;

        function isScrolledIntoView(el) {
            var rect = el.getBoundingClientRect(),
                elemTop = rect.top,
                elemBottom = rect.top + el.offsetHeight,
                bottomWin = pageOffset + window.innerHeight;
            return (elemTop < bottomWin && elemBottom > 0);
        }

        function detect() {
            for(var i = 0; i < items.length; i++) {
                if ( isScrolledIntoView(items[i]) ) {
                    if( !items[i].classList.contains('in-view') ) {
                        items[i].classList.add('in-view');
                    }
                }
            }
        }

        function throttle(fn, wait) {
            var time = Date.now();
            return function() {
                if ((time + wait - Date.now()) < 0) {
                    fn();
                    time = Date.now();
                }
            }
        }

        window.addEventListener('scroll', throttle(detect, 200));

        window.addEventListener('resize', detect);

		for(var i = 0; i < items.length; i++) {
			var d = 0,
				el = items[i];

			if( items[i].getAttribute('data-animate-in-delay') ) {
				d = items[i].getAttribute('data-animate-in-delay') / 1000 + 's';
			} else {
				d = 0;
			}
            el.style.transitionDelay = d;
		}
		detect();
	}
}

module.exports = Viewport;
