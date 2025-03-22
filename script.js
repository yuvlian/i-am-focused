// ==UserScript==
// @name         i-am-focused
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  prevent websites from detecting the tab is out of focus
// @author       Yulian
// @homepageURL  https://github.com/yuvlian/i-am-focused
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener = new Proxy(window.addEventListener, {
        apply(target, thisArg, args) {
            if (["blur", "focus"].includes(args[0])) {
                console.log(`Blocked ${args[0]} event listener`);
                return;
            }
            return Reflect.apply(target, thisArg, args);
        }
    });

    window.onblur = null;
    window.onfocus = null;

    Object.defineProperty(document, "hidden", {
        get: () => false,
        configurable: false
    });

    Object.defineProperty(document, "visibilityState", {
        get: () => "visible",
        configurable: false
    });

    document.addEventListener("visibilitychange", (event) => {
        event.stopImmediatePropagation();
        console.log("Blocked visibilitychange event");
    }, true);
})();
