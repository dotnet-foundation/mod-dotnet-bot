'use strict';

const $ = require('jquery');

class Objects {

	constructor( options ) {
		//setup any defaults
		this.defaults = {};
		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('#bot').length ) {
			this.setup();
		}

	}

	setup() {

		// Objects
		const bot = $('#bot');
		const object = $('.object');

		$(document).ready(function(){
			// set gradient IDs
			$('.object svg *[id]').each(function(){
				let el = $(this);
				let number = el.attr('id');
				//console.log(number);
				let par = el.parents('.object');
				let parName = par.attr('data-object-title');
				parName = parName + '-' + number;
				el.attr('id', parName);
				let newFill = "url(#" + parName +")";
				let paths = par.find('*[fill="url(#' + number +')"]');
				paths.each(function(){
					$(this).attr('fill', newFill);
				});
			});

			//console.log('ready');
			// Set default objects
			let defaultObjects = $('.object--default');
			defaultObjects.each(function(){
				let el = $(this);
				el.click();
			});
			//console.log(defaultObjects.length);
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
