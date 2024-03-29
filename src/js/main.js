import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calculate from "./modules/calculate";
import filter from "./modules/filter";
import showPictureSize from "./modules/showPictureSize";
import accordeon from "./modules/accordeon";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";


window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    modals()
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn')
    sliders('.main-slider-item', 'vertical')
    forms()
    mask('[name="phone"]')
    checkTextInputs('[name="name"]')
    checkTextInputs('[name="message"]')
    showMoreStyles('.button-styles', '#styles .row')
    calculate('#size', '#material', '#options', '.promocode', '.calc-price')
    filter()
    showPictureSize('.sizes-block')
    accordeon('.accordion-heading')
    burger('.burger-menu', '.burger')
    scrolling('.pageup')
    drop()

})
