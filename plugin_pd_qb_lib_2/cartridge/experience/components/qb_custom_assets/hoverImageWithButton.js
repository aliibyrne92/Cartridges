'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'hoverImageButtonOverlay-' + context.component.getID();

    model.buttonDisplay = (!content.show_button)? 'none': 'block';
    
    if(content.show_button){       
        model.buttonURL = (content.button_url) ? content.button_url: URLUtils.url('Home-Show');
        model.buttonText = content.button_text;
        model.buttonColour = (content.button_colour) ? content.button_colour.value : '';
        model.buttonTextColour = (content.button_text_colour) ? content.button_text_colour.value :'';
        model.buttonTextSize = content.button_text_size;
        model.buttonPadding = content.button_padding;
        model.buttonBorderRad = content.border_radius;
        model.buttonLeft = content.button_left;
        model.buttonTop = content.button_top;
        model.buttonBorder = content.btn_border;
    }

    model.image = {
        src: {
            mobile  : ImageTransformation.url(content.image, { device: 'mobile' }),
            desktop : ImageTransformation.url(content.image, { device: 'desktop' })
        },
        alt         : content.image.file.getAlt(),
        focalPointX : content.image.focalPoint.x * 100 + '%',
        focalPointY : content.image.focalPoint.y * 100 + '%'
    };
    model.imageWidth = content.image_width;

    model.textDisplay = (content.show_text)? "block":"none";
    model.text = content.text;

    return new Template('experience/components/qb_custom_assets/hoverImageWithButton').render(model).text;
};