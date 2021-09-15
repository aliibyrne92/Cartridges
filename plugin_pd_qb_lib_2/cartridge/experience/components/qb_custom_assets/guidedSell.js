'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'guided-sell-' + context.component.getID();
    
    // Styling
    model.backgroundColour = (content.bg_colour) ? content.bg_colour.value : '#fff';
    model.bgOffset = (content.bg_offset) ? content.bg_offset.value : '';
    model.textTransform = content.text_transform;
    model.btnColour = (content.btn_colour) ? content.btn_colour.value : 'var(--primary)';
    model.btnOffsetColour = (content.btn_offset_colour) ? content.btn_offset_colour.value : '';
    
    model.title = content.title;
    model.q1 = content.q1;
    model.q1a1 = content.q1a1;
    model.q1a2 = content.q1a2;
    model.q1a3 = content.q1a3;
    model.q2 = content.q2;
    model.q2a1 = content.q2a1;
    model.q2a2 = content.q2a2;
    model.q2a3 = content.q2a3;
    model.q3 = content.q3;
    model.q3a1 = content.q3a1;
    model.q3a2 = content.q3a2;
    model.q3a3 = content.q3a3;
    model.submitURL = (content.submit_url) ? content.submit_url: URLUtils.url('Home-Show');

    // Question 1 images
    if (content.q1a1_image) {
        model.q1a1image = {
            src: {
                mobile  : ImageTransformation.url(content.q1a1_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q1a1_image, { device: 'desktop' })
            },
            alt         : content.q1a1_image.file.getAlt(),
            focalPointX : content.q1a1_image.focalPoint.x * 100 + '%',
            focalPointY : content.q1a1_image.focalPoint.y * 100 + '%'
        };
    } else if (content.q1a1_image == null){
        // TODO find url for default images
        model.q1a1image = {
            src: {
                mobile  : URLUtils.staticURL('/images/gift-certificates.png'),
                desktop : 'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZAP_049/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw2dd7abdf/images/homepage/homepage-5/medium.jpg'
            },
            alt         : 'default'
        };
    }
    if (content.q1a2_image) {
        model.q1a2image = {
            src: {
                mobile  : ImageTransformation.url(content.q1a2_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q1a2_image, { device: 'desktop' })
            },
            alt         : content.q1a2_image.file.getAlt(),
            focalPointX : content.q1a2_image.focalPoint.x * 100 + '%',
            focalPointY : content.q1a2_image.focalPoint.y * 100 + '%'
        };
    }
    if (content.q1a3_image) {
        model.q1a3image = {
            src: {
                mobile  : ImageTransformation.url(content.q1a3_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q1a3_image, { device: 'desktop' })
            },
            alt         : content.q1a3_image.file.getAlt(),
            focalPointX : content.q1a3_image.focalPoint.x * 100 + '%',
            focalPointY : content.q1a3_image.focalPoint.y * 100 + '%'
        };
    }

    // Question 2 images
    if (content.q2a1_image) {
        model.q2a1image = {
            src: {
                mobile  : ImageTransformation.url(content.q2a1_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q2a1_image, { device: 'desktop' })
            },
            alt         : content.q2a1_image.file.getAlt(),
            focalPointX : content.q2a1_image.focalPoint.x * 100 + '%',
            focalPointY : content.q2a1_image.focalPoint.y * 100 + '%'
        };
    }
    if (content.q2a2_image) {
        model.q2a2image = {
            src: {
                mobile  : ImageTransformation.url(content.q2a2_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q2a2_image, { device: 'desktop' })
            },
            alt         : content.q2a2_image.file.getAlt(),
            focalPointX : content.q2a2_image.focalPoint.x * 100 + '%',
            focalPointY : content.q2a2_image.focalPoint.y * 100 + '%'
        };
    }
    if (content.q2a3_image) {
        model.q2a3image = {
            src: {
                mobile  : ImageTransformation.url(content.q2a3_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q2a3_image, { device: 'desktop' })
            },
            alt         : content.q2a3_image.file.getAlt(),
            focalPointX : content.q2a3_image.focalPoint.x * 100 + '%',
            focalPointY : content.q2a3_image.focalPoint.y * 100 + '%'
        };
    }

    // Question 3 images
    if (content.q3a1_image) {
        model.q3a1image = {
            src: {
                mobile  : ImageTransformation.url(content.q3a1_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q3a1_image, { device: 'desktop' })
            },
            alt         : content.q2a1_image.file.getAlt(),
            focalPointX : content.q3a1_image.focalPoint.x * 100 + '%',
            focalPointY : content.q3a1_image.focalPoint.y * 100 + '%'
        };
    }
    if (content.q3a2_image) {
        model.q3a2image = {
            src: {
                mobile  : ImageTransformation.url(content.q3a2_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q3a2_image, { device: 'desktop' })
            },
            alt         : content.q3a2_image.file.getAlt(),
            focalPointX : content.q3a2_image.focalPoint.x * 100 + '%',
            focalPointY : content.q3a2_image.focalPoint.y * 100 + '%'
        };
    }
    if (content.q3a3_image) {
        model.q3a3image = {
            src: {
                mobile  : ImageTransformation.url(content.q3a3_image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.q3a3_image, { device: 'desktop' })
            },
            alt         : content.q3a3_image.file.getAlt(),
            focalPointX : content.q3a3_image.focalPoint.x * 100 + '%',
            focalPointY : content.q3a3_image.focalPoint.y * 100 + '%'
        };
    }

    // Form 
    model.showFormTab = (content.show_form_tab) ? 'block' : 'none';
    model.hideFormTab = (content.show_form_tab) ? 'none' : 'block';
    model.formLabel = content.form_label;
    
    model.showRadioBtn = (content.show_radio_btn) ? 'block' : 'none';
    model.radioBtnLabel = content.radio_btn_label;
    model.radioBtnOpt1 = content.radio_btn_opt1;
    model.radioBtnOpt2 = content.radio_btn_opt2;
    model.radioBtnOpt3 = content.radio_btn_opt3;

    model.showTextInput = (content.show_text_input) ? 'block' : 'none';
    model.textInputLabel = content.text_input_label;

    model.showOptionList = (content.show_option_list) ? 'block' : 'none';
    model.optionListLabel = content.option_list_label;
    model.option1 = content.option1;
    model.option2 = content.option2;
    model.option3 = content.option3;

    return new Template('experience/components/qb_custom_assets/guidedSell').render(model).text;
};