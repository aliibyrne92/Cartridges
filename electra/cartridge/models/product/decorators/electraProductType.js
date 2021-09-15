'use strict';

module.exports = function (object, apiProduct) {
    var electraProductType = apiProduct.custom.electraproducttype;
    //Use Object.defineProperty to add stockInformation to the object 
    Object.defineProperty(object, 'electraProductType', {
        enumerable: false,
        value: electraProductType==null ? 'No product type' : electraProductType
    });
};
