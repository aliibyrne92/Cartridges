'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'blogBody-' + context.component.getID();

    model.postBody = content.post_body;
    model.textAlign = content.text_align;

    return new Template('experience/components/qb_custom_assets/blogBody').render(model).text;
};