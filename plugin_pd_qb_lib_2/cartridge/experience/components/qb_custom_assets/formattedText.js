'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'formattedText-' + context.component.getID();

    model.containerPad = content.container_pad;
    model.textDisplayHeader = (content.text_header != null)? 'block': 'none';
    model.textHeader = (content.text_header != null)? content.text_header: '';
    model.textHeaderType = (content.text_header_type != null)? content.text_header_type: 'h1';
    model.textHeaderFont = content.text_header_font;
    model.textDisplayBody = (content.text_body != null)? 'block': 'none';
    model.textBody = (content.text_body != null)? content.text_body: '';
    model.textBodyFont = content.text_body_font;
    model.textFontWeight = content.text_font_weight;
    model.textSize = content.text_size;
    model.textColour = (content.text_colour)? content.text_colour.value : '';
    model.textAlign = (content.text_align)? content.text_align : 'center';
    model.lineHeight = content.line_height;

    return new Template('experience/components/qb_custom_assets/formattedText').render(model).text;
};