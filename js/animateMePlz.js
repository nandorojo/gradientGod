(function ($) {

    $.fn.animateMePlz = function (options) {

        // Default options
        var settings = $.extend({
            scrollDelay: 10
        }, options);

        var $windowHeight = $(window).height(),
            $scrolled = $(window).scrollTop(),
            $scrollDelay = settings.scrollDelay;

        this.each(function () {
            var $elementOffset = $(this).offset().top, // distance from div to document top
                $delayMePlz = $(this).attr('data-delayMePlz'); // attribute for element's scroll threshold
            if (typeof $delayMePlz !== typeof undefined && $delayMePlz !== false) { // If given has scroll threshold attribute defined
                $scrollDelay = $delayMePlz; // Set delay threshold to the defined pixel amount
            } else {
                $scrollDelay = settings.scrollDelay;
            }
            if ($scrolled + $windowHeight >= $elementOffset + $scrollDelay) {
                return $(this).show();
            } else {
                return $(this).hide();
            }
        });
    };

}(jQuery));
