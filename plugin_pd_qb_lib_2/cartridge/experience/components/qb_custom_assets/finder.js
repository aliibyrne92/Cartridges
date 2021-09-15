//Merged from "ExtendedPDComponents" cartridge

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');



function addPage(){

}

//https://zzsa-060.sandbox.us01.dx.commercecloud.salesforce.com/s/nto/default/men-tops-shirts?
// cgid=men-tops-shirts&
// prefn1=activity&prefv1=Hiking&
// prefn2=apparelFeatures&prefv2=Hooded&
// prefn3=refinementColor&prefv3=Red&
// prefn4=size&prefv4=XL
/**
 * Render logic for the dynamiclayout.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    model.wizard = {
        title: "WIZARD TITLE HERE",
        pages: [
        ]
    };


    model.content = content;

    model.wizard = {
        title: content.wizardTitle,
        showSteps: content.showSteps,
        category: content.wizardCategory,
        colorPrimary: !empty(content.colorPrimary) ? content.colorPrimary.color : '#f7f9fa',
        colorAlternate: !empty(content.colorAlternate) ? content.colorAlternate.color : '#eef7fb',
        pages: [
        ]
    }

    if(content.page1.pageTitle){
        model.wizard.pages.push(content.page1)
    }

    if(content.page2.pageTitle){
        model.wizard.pages.push(content.page2)
    }

    if(content.page3 && content.page3.pageTitle){
        model.wizard.pages.push(content.page3)
    }

    if(content.page4 && content.page4.pageTitle){
        model.wizard.pages.push(content.page4)
    }

    if(content.page5 && content.page5.pageTitle){
        model.wizard.pages.push(content.page5)
    }

    if(content.page6 && content.page6.pageTitle){
        model.wizard.pages.push(content.page6)
    }

    if(content.page7 && content.page7.pageTitle){
        model.wizard.pages.push(content.page7)
    }

    if(content.page8 && content.page8.pageTitle){
        model.wizard.pages.push(content.page8)
    }

    if(content.page9 && content.page9.pageTitle){
        model.wizard.pages.push(content.page9)
    }

    if(content.page10 && content.page10.pageTitle){
        model.wizard.pages.push(content.page10)
    }


    return new Template('experience/components/qb_custom_assets/finder').render(model).text;
};
