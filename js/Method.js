"use strict";
let Method = function () {
    return {
        SelectAjax: function (data, callback, dataType = "text") {
            $.ajax({
                url: "../php/request_reply.php",
                data: data,
                dataType: dataType,
                type: "POST",
                success: function (data) {
                    if (callback instanceof Function)
                        callback(data)
                },
                error: function (w, z, x) {
                    $("body").append(w.responseText);
                    callback("失败了，稍后再试试╥﹏╥...")
                    // log w ,z ,x
                }
            })
        },
        showMessage: function (message) {
            const className = ".message";
            $("body").append(_f.madeHtml.message());
            $(className).empty().html(message).css("left", (window.innerWidth - $(className)[0].offsetWidth) / 2);
            setTimeout("$('.message').remove()", 3000);
        },
        setCookie: function (key, value) {
            if (typeof key === "string") {
                document.cookie = `${key}=${value};path=/;`
            }
        },
        getCookie: function (key) {
            let value = null;
            if (typeof key === "string") {
                const reg = new RegExp(`${key}=\\S+;|${key}=\\S+`, "g"),
                    regR = new RegExp(`${key}=|;`, "g");
                value = document.cookie.match(reg);
                if (value) value = value[0].replace(regR, "");
            }
            return value;
        },
        /**
         * @module 根据返回的html数据生成html String
         * @param{Object} data {website:[data...],multiple} multiple是否为多个数据的数组
         * @return{string} 返回生成的数据
         */
        pageHtml: function (data) {
            let result = "";
            if (data && (data instanceof Object)) {
                for (const val in data) {
                    if (!data.hasOwnProperty(val) || !(data[val] instanceof Object)) return false;
                    try {
                        if (_f.madeHtml[val] instanceof Function) {
                            if (data[val]["multiple"]) {
                                for (const i in data[val]) {
                                    if (i !== "multiple")
                                        result += _f.madeHtml[val](data[val][i]);
                                }
                            } else
                                result += _f.madeHtml[val](data[val]);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }

                return result;
            }
        },
    }

}();
export default Method;