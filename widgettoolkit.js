// ==UserScript==
// @name         WidgetToolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (typeof(Sequra) !== 'undefined') {
        console.log('Sequra cargado!');
    }

    if (typeof(SequraHelper) !== 'undefined') {
        console.log('SequraHelper cargado!');
        
        SequraHelper.original_drawPromotionWidget = SequraHelper.drawPromotionWidget;
        SequraHelper.drawPromotionWidget = function(price_src, dest, product, theme, reverse, campaign) {
            if (typeof(SequraHelper.WidgetsPintados) == 'undefined') {
                SequraHelper.WidgetsPintados = [];
            }
            SequraHelper.WidgetsPintados[product] = {
                src: price_src,
                dest: dest
            }

            console.log('Widget ' + product + ' pintado.');
            console.log(document.querySelectorAll(price_src).length + ' elementos con el selector de precio');
            console.log(document.querySelectorAll(dest).length + ' elementos con el selector de destino');
            SequraHelper.original_drawPromotionWidget(price_src, dest, product, theme, reverse, campaign);
        }

        SequraHelper.listWidgets = function() {
            document.querySelectorAll('.sequra-promotion-widget').forEach(
                function(item, index) {
                    console.log(item.getAttribute('data-product') + ' observes ->' + item.getAttribute('observes'));
                }
            );
        }

        SequraHelper.drawPromotionWidget_original = SequraHelper.drawPromotionWidget;

        SequraHelper.reDrawWidgetsByProduct = function(price_src, dest, product, theme, reverse, campaign) {
            SequraHelper.drawnWidgets[price_src + dest + product + theme + reverse + campaign] = false;
            SequraHelper.drawPromotionWidget_original(price_src, dest, product, theme, reverse, campaign);
        }

        /*
            SequraHelper.drawPromotionWidget = function (price_src,dest,product,theme,reverse,campaign) {
            SequraHelper.drawPromotionWidget_original(price_src,dest,product,theme,reverse,campaign);
            SequraHelper.reDrawnWidgetsByProduct[product] = function () {
                SequraHelper.reDrawWidgetsByProduct(price_src,dest,product,theme,reverse,campaign);
            }
            }
        */
        SequraHelper.removeWidgetByProduct = function(product) {
            document.querySelectorAll('.sequra-promotion-widget[data-product=' + product + ']').forEach(
                function(item, index) {
                    item.remove();
                }
            );
        }

    }
})();
