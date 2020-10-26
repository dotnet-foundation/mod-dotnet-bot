'use strict';

const $ = require('jquery');

class Objects {

	constructor( options ) {
		//setup any defaults
		this.defaults = {};
		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );
		this.setup();
	}

	setup() {

		// Objects
		const bot = $('#bot');
		const object = $('.object');

		function swapId(element, number) {
			let el = element;
			let par = el.parents('.object');
			let parName = par.attr('data-object-title');
			parName = parName + '-' + number;
			el.attr('id', parName);
			let newFill = "url(#" + parName +")";
			let paths = par.find('path[fill="url(#SVGID_' + number +'_)"]');
			paths.each(function(){
				$(this).attr('fill', newFill);
			});
		}

		// set gradient IDs
		// Todo rework this
		$(window).on('load', function(){
			$('svg *[id="SVGID_1_"]').each(function(){swapId($(this), 1)});
			$('svg *[id="SVGID_2_"]').each(function(){swapId($(this), 2)});
			$('svg *[id="SVGID_3_"]').each(function(){swapId($(this), 3)});
			$('svg *[id="SVGID_4_"]').each(function(){swapId($(this), 4)});
			$('svg *[id="SVGID_5_"]').each(function(){swapId($(this), 5)});
			$('svg *[id="SVGID_6_"]').each(function(){swapId($(this), 6)});
			$('svg *[id="SVGID_7_"]').each(function(){swapId($(this), 7)});
			$('svg *[id="SVGID_8_"]').each(function(){swapId($(this), 8)});
			$('svg *[id="SVGID_9_"]').each(function(){swapId($(this), 9)});
			$('svg *[id="SVGID_10_"]').each(function(){swapId($(this), 10)});
			$('svg *[id="SVGID_11_"]').each(function(){swapId($(this), 11)});
			$('svg *[id="SVGID_12_"]').each(function(){swapId($(this), 12)});
			$('svg *[id="SVGID_13_"]').each(function(){swapId($(this), 13)});
			$('svg *[id="SVGID_14_"]').each(function(){swapId($(this), 14)});
			$('svg *[id="SVGID_15_"]').each(function(){swapId($(this), 15)});
			$('svg *[id="SVGID_16_"]').each(function(){swapId($(this), 16)});
			$('svg *[id="SVGID_17_"]').each(function(){swapId($(this), 17)});
			$('svg *[id="SVGID_18_"]').each(function(){swapId($(this), 18)});
			$('svg *[id="SVGID_19_"]').each(function(){swapId($(this), 19)});
			$('svg *[id="SVGID_20_"]').each(function(){swapId($(this), 20)});
			$('svg *[id="SVGID_21_"]').each(function(){swapId($(this), 21)});
			$('svg *[id="SVGID_22_"]').each(function(){swapId($(this), 22)});
			$('svg *[id="SVGID_23_"]').each(function(){swapId($(this), 23)});
			$('svg *[id="SVGID_24_"]').each(function(){swapId($(this), 24)});
			$('svg *[id="SVGID_25_"]').each(function(){swapId($(this), 25)});
			$('svg *[id="SVGID_26_"]').each(function(){swapId($(this), 26)});
			$('svg *[id="SVGID_27_"]').each(function(){swapId($(this), 27)});
			$('svg *[id="SVGID_28_"]').each(function(){swapId($(this), 28)});
			$('svg *[id="SVGID_29_"]').each(function(){swapId($(this), 29)});
			$('svg *[id="SVGID_30_"]').each(function(){swapId($(this), 30)});
			$('svg *[id="SVGID_31_"]').each(function(){swapId($(this), 31)});
			$('svg *[id="SVGID_32_"]').each(function(){swapId($(this), 32)});
			$('svg *[id="SVGID_33_"]').each(function(){swapId($(this), 33)});
			$('svg *[id="SVGID_34_"]').each(function(){swapId($(this), 34)});
			$('svg *[id="SVGID_35_"]').each(function(){swapId($(this), 35)});
			$('svg *[id="SVGID_36_"]').each(function(){swapId($(this), 36)});
			$('svg *[id="SVGID_37_"]').each(function(){swapId($(this), 37)});
			$('svg *[id="SVGID_38_"]').each(function(){swapId($(this), 38)});
			$('svg *[id="SVGID_39_"]').each(function(){swapId($(this), 39)});


			// Set default objects
			let defaultObjects = $('.object--default');
			defaultObjects.each(function(){
				$(this).click();
			});

		});


		object.click(function(){
			let obj = $(this),
				group = obj.parents('.object-group'),
				cat =  group.attr('data-objects'),
				holder = obj.attr('data-holder'),
			  objName = obj.attr('data-object-title');

			holder = $('#'+ holder +'');

			// Check if object is already active
			if( obj.hasClass('is-active') ) {
				// Accessories stack so we can't empty the entire holder
				// if(cat == 'accessories') {
				// 	// only remove clicked object
				// 	holder.find('g.' + objName + '').remove();
				// } else {
				// 	// clear entire holder
				// }
				holder.empty();
				obj.removeClass('is-active');

				if( group.hasClass('has-default') ) {
					console.log('has default');
					group.find('.object.object--default').click();
				}

				if( obj.hasClass('hide-antenna') ) {
					console.log('show antenna');
					bot.removeClass('hide-antenna');
				}

			} else {

				// Accessories stack so we can't empty the entire holder
				// if(cat != 'accessories') {
				// 	group.find('.object.is-active').removeClass('is-active');
				// 	holder.empty();
				// }

				group.find('.object.is-active').removeClass('is-active');
				holder.empty();
				obj.addClass('is-active');

				// grab svg contents
				let contents = obj.find('svg > g');
				// add unique name for targeting if required (stacking objects)
				contents.addClass(objName);

				// Clone and add to holder
				let contentClone = contents.clone();
				holder.append(contentClone);

				if( obj.hasClass('hide-antenna') ) {
					bot.addClass('hide-antenna');
				} else {
					bot.removeClass('hide-antenna');
				}
			}
		});




	}
}

module.exports = Objects;
