/*!
 * A website JavaScript ES6 Library v0.1
 *
 * Copyright Made by Fanny
 *
 * Date: 2019-8-20 00:00 GMT
 *
 * */
"use strict";
import Made from "../js/Factory.js";
import Method from "../js/Method.js";

(function (global) {
    if (!global) throw new Error("BAD OBJECT WINDOW");
    let _f, version = "0.1", name = "don`tKnow", made = new Made();
    return _f = global._f = {

        madeHtml: new made.MadeHtml(),

        page: new made.Page,

        Method,

        version,

        name

    }
})(window);