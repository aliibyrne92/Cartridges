'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.3column.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.col1Width = content.col1_width;
    model.col2Width = content.col2_width;
    model.col3Width = content.col3_width;
    model.bgColour = (content.bg_colour) ? content.bg_colour.value : 'transparent';

    return new Template('experience/components/qb_custom_layouts/3columnAdjustable').render(model).text;
};
