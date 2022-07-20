'use strict';

const $ = require('jquery');


class Controls {

    constructor(options) {
        //setup any defaults
        this.defaults = {};
        //merge options with defaults
        this.settings = $.extend(true, {}, this.defaults, options);
        if ($('#bot').length) {
            this.setup();
        }
    }

    setup() {

        // Category swap
        const category = $('.category');
        const objectGroup = $('.object-group');

        const scrollRight = $('.arrow-next');
        const scrollLeft = $('.arrow-prev');
        let scrollDist = 350;
        const obj = $('.objects-wrap');

        category.click(function () {
            let el = $(this);
            let cat = el.attr('data-category');
            let target = $('.object-group[data-objects=' + cat + ']');

            category.removeClass('is-active');
            el.addClass('is-active');
            objectGroup.removeClass('is-active');
            target.addClass('is-active');

            obj.animate({
                scrollLeft: 0
            }, 0);
        });

        scrollRight.click(function () {
            var totalScroll = obj.prop('scrollWidth');
            let currentScroll = obj.scrollLeft();
            let wrapperWidth = $('#objects').width();
            let scrollDist = wrapperWidth - 100;
            let scrollToLocation = currentScroll + scrollDist;

            if (scrollToLocation > totalScroll) {
                scrollToLocation = totalScroll - 10;
            }
            obj.animate({
                scrollLeft: scrollToLocation
            }, 800);
        });

        scrollLeft.click(function () {
            let currentScroll = obj.scrollLeft();
            let wrapperWidth = $('#objects').width();
            let scrollDist = wrapperWidth - 100;
            let scrollToLocation = currentScroll - scrollDist;
            if (scrollToLocation < 0) {
                scrollToLocation = 0;
            }
            obj.animate({
                scrollLeft: scrollToLocation
            }, 800);
        });
    }
}

module.exports = Controls;
