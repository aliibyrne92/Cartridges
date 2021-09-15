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
    model.col4Width = content.col4_width;
    model.col5Width = content.col5_width;
    model.col6Width = content.col6_width;
    model.col7Width = content.col7_width;
    model.col8Width = content.col8_width;
    model.bgColour = (content.bg_colour) ? content.bg_colour.value : 'transparent';

    return new Template('experience/components/qb_custom_layouts/8columnAdjustable').render(model).text;
};
