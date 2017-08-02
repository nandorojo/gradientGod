function makeRandomColor(){
  var c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1)
  }
  return '#'+c;
}

$(document).ready(function () {
    $('#gradientDirection').find('li').each(function () {
        var $degrees = $(this).text().replace(' degrees', '').trim();
        $(this).attr('data-gradientDirection', $degrees)
    });

    var $gradientDirection = $('#gradientDirection').find('li.active').attr('data-gradientDirection'),
        $directionChooser = $('#gradientDirection').find('li'),
        $gradientDisplay = $('.gradient'),
        $elementChooser = $('#elementType').find('li'),
        $gradientButtons = $('.gradientButtons').find('.button'),
        $firstColor = '#9400d3',
        $secondColor = '#ec2a80';

    if (window.location.hash) {
        var hash = window.location.hash.substring(1), //Puts hash in variable, and removes the # character
            splitHash = hash.split('='),
            values = splitHash[1].split(';');
        $firstColor = values[0];
        $secondColor = values[1];
        $gradientDirection = values[2];
    } else {
        // No hash found
    };

    // initialize droppers
    $("#firstColor").spectrum({
        showPalette: true,
        showInput: true,
        preferredFormat: "hex",
        color: $firstColor,
        localStorageKey: "spectrum.homepage", // Any Spectrum with the same string will share selection
        move: function (color) {
            $firstColor = color.toHexString(); // #ff0000
            linearGradient($firstColor, $secondColor, $gradientDirection);
            $('.firstColor .sp-preview-inner').html('<div>' + $firstColor + '</div>');
        },
        change: function (color) {
            $firstColor = color.toHexString(); // #ff0000
            linearGradient($firstColor, $secondColor, $gradientDirection);
            $('.firstColor .sp-preview-inner').html('<div>' + $firstColor + '</div>');
        }
    });
    $("#secondColor").spectrum({
        showPalette: true,
        showInput: true,
        preferredFormat: "hex",
        localStorageKey: "spectrum.homepage", // Any Spectrum with the same string will share selection
        color: $secondColor,
        move: function (color) {
            $secondColor = color.toHexString(); // #ff0000
            linearGradient($firstColor, $secondColor, $gradientDirection);
            $('.secondColor .sp-preview-inner').html('<div>' + $secondColor + '</div>');
        }
    });

    $('.color-options .firstColor').find('.random').on('click', function () {
        $(this).attr('data-firstColorRand', makeRandomColor());
        var $randomcolor = $(this).attr('data-firstcolorrand').trim().replace('"', '');
        $('#firstColor').spectrum('set', $randomcolor)
        $firstColor = $randomcolor;
        linearGradient($firstColor, $secondColor, $gradientDirection);
    });
    
    $('.color-options .secondColor').find('.random').on('click', function () {
        $(this).attr('data-firstColorRand', makeRandomColor());
        var $randomcolor = $(this).attr('data-firstcolorrand').trim().replace('"', '');
        $('#secondColor').spectrum('set', $randomcolor)
        $secondColor = $randomcolor;
        linearGradient($firstColor, $secondColor, $gradientDirection);
    });

    function linearGradient(color1, color2, gradientDirection) {
        $gradientDisplay.css({
            'background-image': '"' + color1 + '"',
            /* For browsers that do not support gradients */
            'background-image': '-webkit-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Safari 5.1 to 6.0 */
            'background-image': '-o-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Opera 11.1 to 12.0 */
            'background-image': '-moz-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Firefox 3.6 to 15 */
            'background-image': 'linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')' /* Standard syntax */
        });
        $gradientButtons.css({
            'background-image': '"' + color1 + '"',
            /* For browsers that do not support gradients */
            'background-image': '-webkit-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Safari 5.1 to 6.0 */
            'background-image': '-o-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Opera 11.1 to 12.0 */
            'background-image': '-moz-linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')',
            /* For Firefox 3.6 to 15 */
            'background-image': 'linear-gradient(' + gradientDirection + 'deg,' + color1 + ',' + color2 + ')' /* Standard syntax */
        });
        window.location.hash = '?gradient=' + color1 + ';' + color2 + ';' + gradientDirection;

        $('.firstColor .sp-preview-inner').html('<div>' + color1 + '</div>');
        $('.secondColor .sp-preview-inner').html('<div>' + color2 + '</div>');
        
        exportLinear($firstColor, $secondColor, $gradientDirection)
    };

    linearGradient($firstColor, $secondColor, $gradientDirection);

    function exportLinear(color1, color2, gradientDirection) {
        var $exportHere = $('.exported').find('code');
        $exportHere.html('<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>yourDiv<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span><br><br><span class="token selector">#yourDiv</span> <span class="token punctuation">{</span><br> <span class="token property">background</span><span class="token punctuation">:</span> ' + color1 + '<span class="token punctuation">;</span> <span class="token comment" spellcheck="true">/* For browsers that do not support gradients */<br></span> <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-webkit-linear-gradient</span><span class="token punctuation">(</span>' + gradientDirection + 'deg, ' + color1 + ', ' + color2 + '<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">/* For Safari 5.1 to 6.0 */<br></span> <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-o-linear-gradient</span><span class="token punctuation">(</span>' + gradientDirection + 'deg, ' + color1 + ', ' + color2 + '<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">/* For Opera 11.1 to 12.0 */<br></span> <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">-moz-linear-gradient</span><span class="token punctuation">(</span>' + gradientDirection + 'deg, ' + color1 + ', ' + color2 + '<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">/* For Firefox 3.6 to 15 */<br></span> <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>' + gradientDirection + 'deg, ' + color1 + ', ' + color2 + '<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">/* Standard syntax */<br></span><span class="token punctuation">}</span>')
    };

    $directionChooser.on('click', function () {
        $directionChooser.removeClass('active');
        $(this).addClass('active');
        if ($(this).text().trim().toLowerCase() != 'custom') {
            $gradientDirection = $('#gradientDirection').find('li.active').attr('data-gradientDirection');
            linearGradient($firstColor, $secondColor, $gradientDirection);
        } else {
            $('.custom-color').addClass('active');
        }
    });

    $('.export-me').on('click', function () { // export
        $('.exported').toggleClass('active');
        exportLinear($firstColor, $secondColor, $gradientDirection);
    });

    $('.custom-color').find('.overlay').on('click', function () {
        $('.custom-color').removeClass('active');
    });

    $('.custom-color').find('input').on('keyup', function () {
        var $typed = $(this).val().trim();
        if ($typed.length > 0) {
            if ($typed >= 0 && $typed <= 360) {
                $('.custom-color').find('.button').removeClass('disabled').removeClass('button-outline');
                $gradientDirection = $typed;
            } else {
                $('.custom-color').find('.button').addClass('disabled').addClass('button-outline');
            }
        };
    });

    $('.custom-color .button').on('click', function () {
        if (!$(this).hasClass('disabled')) {
            $('.custom-color').removeClass('active');
            linearGradient($firstColor, $secondColor, $gradientDirection);
        }
    });
    
    $('.color-options .flip').on('click', function(){ // swap colors
        var $firstCurrent = $('#firstColor').spectrum('get'),
            $secondCurrent = $('#secondColor').spectrum('get');
        $firstColor = $secondCurrent;
        $secondColor = $firstCurrent;
        $('#firstColor').spectrum('set', $secondCurrent);
        $('#secondColor').spectrum('set', $firstCurrent);
        linearGradient($firstColor, $secondColor, $gradientDirection)
    });
    
    // GRADIENT SECTION HEIGHT
    $('.gradient').each(function(){
        var $header1 = $('header').height(),
            $header2 = $('.picker').height();
        if($(this).css('position') == 'fixed'){
            $(this).css({
                'top': $header1 + $header2 + 'px',
                height: 'calc(100vh - ' +$header1 + $header2 + ')'
            })
        }
    });
});
