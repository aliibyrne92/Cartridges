'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.1column.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.bgColour = (context.content.bg_colour) ? context.content.bg_colour.value : 'transparent';

    return new Template('experience/components/qb_custom_layouts/1rowFullWidth').render(model).text;
};
