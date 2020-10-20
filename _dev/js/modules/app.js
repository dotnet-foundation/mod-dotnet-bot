'use strict';

const $ = require('jquery');

class App {

	constructor( options ) {


		if ( ! ('ontouchstart' in window) ) {
			document.documentElement.classList.add('no-touch');
		}

		if ( 'ontouchstart' in window ) {
			document.documentElement.classList.add('is-touch');
		}

		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
			if(navigator.appVersion.indexOf('Trident') === -1) {
				document.documentElement.classList.add('isEDGE');
			} else {
				$('html').addClass('isIE isIE11');
			}
		}

		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

		if(isSafari){
			document.body.classList.add('browser-safari');
		}

		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('darkmode');
		}

		if(window.location.hostname == 'localhost' | window.location.hostname == '127.0.0.1'){
			document.body.classList.add('localhost');
		}

		$(document).ready(function(){
			$('body').addClass('page-loaded');
		});

		setTimeout(function(){
			$('body').addClass('page-loaded');
		}, 5000);
	}

}

module.exports = App;
