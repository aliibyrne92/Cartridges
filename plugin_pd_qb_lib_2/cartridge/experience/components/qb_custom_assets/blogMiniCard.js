'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'blogMiniCard-' + context.component.getID();
    
    model.textHeader = (content.text_header != null)? content.text_header: '';
    model.textHeaderType = (content.text_header_type != null)? content.text_header_type: 'h1';
    model.textBody = (content.post_descr != null)? content.post_descr: '';
    model.postHashtag = (content.post_hashtag != null)? content.post_hashtag: ''; 

    model.textColour = content.text_colour;

    model.textAlign = content.text_align;
    
    model.linkURL = (content.link_url)

    if (content.image) {
        model.image = {
            src: {
                mobile  : ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.image.focalPoint.x * 100 + '%',
            focalPointY : content.image.focalPoint.y * 100 + '%'
        };
        model.imageHeight = content.image_height;
    }

    return new Template('experience/components/qb_custom_assets/blogMiniCard').render(model).text;
};