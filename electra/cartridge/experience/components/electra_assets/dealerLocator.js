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

    model.id = 'dealerlocator-' + context.component.getID();
    model.redirectURL = (content.redirect_url)? content.redirect_url: URLUtils.url('Home-Show');

    model.titleText = content.title_text;
    model.subtitleText = content.subtitle_text;
    model.searchPlaceholder = content.search_placeholder;
    model.checkZipButtonText = content.check_zip_button_text;

    return new Template('experience/components/electra_assets/dealerLocator').render(model).text;
};