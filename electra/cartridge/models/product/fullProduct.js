'use strict';

/**
 * Base fullProduct model overridden to decorate additional product custom attributes
 */
var base = module.superModule;
var decorators = require('*/cartridge/models/product/decorators/index');
var electraProductType = require('*/cartridge/models/product/decorators/electraProductType');

/**
 * Decorate product with full product information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {string} options - Options passed in from the factory
 * @property {dw.catalog.ProductVarationModel} options.variationModel - Variation model returned by the API
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function fullProduct(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);

    decorators.threekitAttributes(product, apiProduct);
    electraProductType(product, apiProduct);

    return product;
};
