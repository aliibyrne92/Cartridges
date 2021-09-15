'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'textButton-' + context.component.getID();

    model.textDisplay = (!content.show_text)? 'none': 'block';
    model.buttonDisplay = (!content.show_button)? 'none': 'block';
    
    if(content.show_text){
        model.textDisplayHeader = (content.text_header != null)? 'block': 'none';
        model.textHeader = (content.text_header != null)? content.text_header: '';
        model.textHeaderType = (content.text_header_type != null)? content.text_header_type: 'h1';
        model.textDisplayBody = (content.text_body != null)? 'block': 'none';
        model.textBody = (content.text_body != null)? content.text_body: '';

        model.textFontWeight = content.text_font_weight;
        model.textSize = content.text_size;
        model.textColour = content.text_colour;

        model.textAlign = (content.text_align)? content.text_align : 'center';
    }
    if(content.show_button){
        model.buttonURL = (content.button_url)? content.button_url: URLUtils.url('Home-Show');
        model.buttonText = content.button_text;
        model.buttonColour = content.button_colour;
        model.buttonTextColour = content.button_text_colour;
        model.buttonTextSize = content.button_text_size;
        model.buttonPadding = content.button_padding;
        model.buttonAlign = content.button_align;
        model.buttonBorderRad = content.border_radius;
        model.buttonBorder = content.button_border;
    }

    return new Template('experience/components/qb_custom_assets/textButton').render(model).text;
};