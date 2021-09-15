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

    model.id = 'zipcode-check-' + context.component.getID();
    model.redirectURL = (content.redirect_url)? content.redirect_url: URLUtils.url('Home-Show');
    model.checkZipButtonText = (content.check_zip_button_text)? content.check_zip_button_text : 'Check Availability';
    model.buttonAlign = content.button_align;

    return new Template('experience/components/qb_custom_assets/zipcodeCheck').render(model).text;
};