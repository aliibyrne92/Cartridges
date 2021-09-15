'use strict';// eslint-disable-line

var base = module.superModule;

var ProductMgr = require('dw/catalog/ProductMgr');
var Resource = require('dw/web/Resource');

var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

base.addLineItem = function (
    currentBasket,
    product,
    quantity,
    childProducts,
    optionModel,
    defaultShipment
) {
    var productLineItem = currentBasket.createProductLineItem(
        product,
        optionModel,
        defaultShipment
    );

    if (product.bundle && childProducts.length) {
        base.updateBundleProducts(productLineItem, childProducts);
    }

    productLineItem.setQuantityValue(quantity);

    // Marketplacer custom code: Start - to add seller information to pli
    if (productLineItem && product.custom.marketplacerSellerId) {
        productLineItem.custom.marketplacerSellerId = product.custom.marketplacerSellerId;
        productLineItem.custom.marketplacerSellerName = product.custom.marketplacerSellerName;
        productLineItem.custom.marketplacerSellerLogo = product.custom.marketplacerSellerLogo;
    }
    // Marketplacer custom code: End

    return productLineItem;
};

base.addProductToCart = function (currentBasket, productId, quantity, childProducts, options, storeId, req) {
	var overlayHelper = require('*/cartridge/scripts/overlayHelper');
    var inStorePickupEnabled = overlayHelper.isPluginEnabled('InStorePickup');
	
    var availableToSell;
    var defaultShipment = currentBasket.defaultShipment;
    var perpetual;
    var product = ProductMgr.getProduct(productId);
    var productInCart;
    var productLineItems = currentBasket.productLineItems;
    var productQuantityInCart;
    var quantityToSet;
    var optionModel = productHelper.getCurrentOptionModel(product.optionModel, options);
    var result = {
        error: false,
        message: Resource.msg('text.alert.addedtobasket', 'product', null)
    };

    var totalQtyRequested = 0;
    var canBeAdded = false;

    if (product.bundle) {
        canBeAdded = base.checkBundledProductCanBeAdded(childProducts, productLineItems, quantity);
    } else {
        totalQtyRequested = quantity + base.getQtyAlreadyInCart(productId, productLineItems);
        perpetual = product.availabilityModel.inventoryRecord.perpetual;
        canBeAdded =
            (perpetual || totalQtyRequested <= product.availabilityModel.inventoryRecord.ATS.value);
    }

    if (!canBeAdded) {
        result.error = true;
        result.message = Resource.msgf(
            'error.alert.selected.quantity.cannot.be.added.for',
            'product',
            null,
            product.availabilityModel.inventoryRecord.ATS.value,
            product.name
        );
        return result;
    }

    if (inStorePickupEnabled) {
        // Get the existing product line item from the basket if the new product item
        // has the same bundled items or options and the same instore pickup store selection
        productInCart = getExistingProductLineItemInCartWithTheSameStore(
            product, productId, productLineItems, childProducts, options, storeId);
    } else {
    productInCart = base.getExistingProductLineItemInCart(
        product, productId, productLineItems, childProducts, options);
    }
    
    if (productInCart) {
        productQuantityInCart = productInCart.quantity.value;
        quantityToSet = quantity ? quantity + productQuantityInCart : productQuantityInCart + 1;
        availableToSell = productInCart.product.availabilityModel.inventoryRecord.ATS.value;

        if (availableToSell >= quantityToSet || perpetual) {
            productInCart.setQuantityValue(quantityToSet);
            result.uuid = productInCart.UUID;
        } else {
            result.error = true;
            result.message = availableToSell === productQuantityInCart
                ? Resource.msg('error.alert.max.quantity.in.cart', 'product', null)
                : Resource.msg('error.alert.selected.quantity.cannot.be.added', 'product', null);
        }
    } else {
    	var shipment = defaultShipment;
        if (inStorePickupEnabled) {
            // Create a new instore pickup shipment as default shipment for product line item
            // if the shipment if not exist in the basket
            var inStoreShipment = createInStorePickupShipmentForLineItem(currentBasket, storeId, req);
            shipment = inStoreShipment || defaultShipment;

            if (shipment.shippingMethod && shipment.shippingMethod.custom.storePickupEnabled && !storeId) {
                shipment = currentBasket.createShipment(UUIDUtils.createUUID());
            }
        }
    	
        var productLineItem;
        productLineItem = base.addLineItem(
            currentBasket,
            product,
            quantity,
            childProducts,
            optionModel,
            shipment
        );

        if (inStorePickupEnabled) {
            // Once the new product line item is added, set the instore pickup fromStoreId for the item
            if (productLineItem.product.custom.availableForInStorePickup) {
                if (storeId) {
                    var instorePickupStoreHelper = require('*/cartridge/scripts/helpers/instorePickupStoreHelpers');
                    instorePickupStoreHelper.setStoreInProductLineItem(storeId, productLineItem);
                }
            }
        }
        
        result.uuid = productLineItem.UUID;
    
        if (inStorePickupEnabled) {
            var Transaction = require('dw/system/Transaction');
            Transaction.wrap(function () {
                COHelpers.ensureNoEmptyShipments(req);
            });
        }
    }

    return result;
};

/**
 * Loops through all Shipments and attempts to select a ShippingMethod, where absent
 * @param {dw.catalog.Product} product - Product object
 * @param {string} productId - Product ID to match
 * @param {dw.util.Collection<dw.order.ProductLineItem>} productLineItems - Collection of the Cart's
 *     product line items
 * @param {string[]} childProducts - the products' sub-products
 * @param {SelectedOption[]} options - product options
 * @param {string} storeId - store id
 * @return {dw.order.ProductLineItem} - Filtered the product line item matching productId
 *  and has the same bundled items or options and the same instore pickup store selection
 */
 function getExistingProductLineItemInCartWithTheSameStore(
    product,
    productId,
    productLineItems,
    childProducts,
    options,
    storeId) {
    var existingProductLineItem = null;
    var matchingProducts = base.getExistingProductLineItemsInCart(
        product,
        productId,
        productLineItems,
        childProducts,
        options);
    if (matchingProducts.length) {
        existingProductLineItem = arrayHelper.find(matchingProducts, function (matchingProduct) {
            return hasSameStore(matchingProduct.custom.fromStoreId, storeId);
        });
    }
    return existingProductLineItem;
}


/**
 * create a new instore pick shipment if the store shipment
 * is not exist in the basket for adding product line item
 * @param {dw.order.Basket} basket - the target Basket object
 * @param {string} storeId - store id
 * @param {Object} req - The local instance of the request object
 * @return {dw.order.Shipment} returns Shipment object
 */
 function createInStorePickupShipmentForLineItem(basket, storeId, req) {
    var shipment = null;
    if (basket && storeId) {
        // check if the instore pickup shipment is already exist.
        shipment = getInStorePickupShipmentInCartByStoreId(basket, storeId);
        if (!shipment) {
            // create a new shipment to put this product line item in
            shipment = basket.createShipment(UUIDUtils.createUUID());
            shipment.custom.fromStoreId = storeId;
            shipment.custom.shipmentType = 'instore';
            req.session.privacyCache.set(shipment.UUID, 'valid');

            // Find in-store method in shipping methods.
            var shippingMethods =
                ShippingMgr.getShipmentShippingModel(shipment).getApplicableShippingMethods();
            var shippingMethod = collections.find(shippingMethods, function (method) {
                return method.custom.storePickupEnabled;
            });
            var store = StoreMgr.getStore(storeId);
            var storeAddress = {
                address: {
                    firstName: store.name,
                    lastName: '',
                    address1: store.address1,
                    address2: store.address2,
                    city: store.city,
                    stateCode: store.stateCode,
                    postalCode: store.postalCode,
                    countryCode: store.countryCode.value,
                    phone: store.phone
                },
                shippingMethod: shippingMethod.ID
            };
            COHelpers.copyShippingAddressToShipment(storeAddress, shipment);
        }
    }
    return shipment;
}

module.exports = base;
