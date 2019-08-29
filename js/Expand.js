/*!
 *
 */


(function () {
    "use strict";
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        $("body").empty().append("不支持IE建议更换浏览器");
        return false;
    }

    // TODO defineProperty中设置function后function的name属性值为value
    Object.defineProperties(String.prototype, {


            deleteEndNullChar: {
                /**
                 * @module 删除字符串的最后的空格
                 *
                 */
                value: function () {

                    return this.replace(/\s*$/g, "");
                }
            },
            firstUpperCase: {
                /**
                 * @module 检查字符串首字母是否大写
                 */
                value: function () {
                    return this.match(/^[a-z]/)
                }
            }
        }
    );
    Object.defineProperties(Object.prototype, {
        deepClone: {
            /**
             * @module 对象的深度复制
             * @return 复制后的对象
             */
            value: function (Obj) {
                if (Obj instanceof Object) {
                    let obj = Obj instanceof Array ? [] : {};
                    for (let val in Obj) {
                        if (Obj.hasOwnProperty(val) && Obj[val] instanceof Object) {
                            obj[val] = Object.deepClone(Obj[val]);
                        } else
                            obj[val] = Obj[val];
                    }
                    return obj;
                } else return false;
            }
        },
        len: {
            /**
             * @module 对象的属性长度 不迭代子对象
             */
            value: function (Obj) {
                let len = 0;
                for (let value in Obj) {
                    if (Obj.hasOwnProperty(value)) len++;
                }
                return len;
            }
        },
        findObject: {
            /**
             * @module 根据属性名和值在祖对象中查找其所在的父对象
             * @param{Object} Obj 要查找的对象的引用
             * @param{string} name 查找的属性名
             * @param{string} value 查找的属性值
             * @param{boolean} pointer 可选 返回原祖对象引用的父对象或深度复制的父对象 默认引用
             * @return{Object||boolean} 返回找的的对象 | 失败
             */

            value: function (Obj, name, value, pointer = false) {

                if (Obj instanceof Object && typeof name === "string") {
                    const previous = pointer ? Obj : Object.deepClone(Obj);
                    let temp;
                    if (Obj.hasOwnProperty(name) && Obj[name] === value) return previous;
                    else {
                        for (let val in Obj)
                            if (Obj.hasOwnProperty(val) && Obj[val] instanceof Object) {
                                temp = Object.findObject(Obj[val], name, value, pointer);
                                if (temp) return temp;
                            }

                        return false;
                    }

                }
            }
        },
        keyValueObj: {
            /**
             * @module 检查对象是否只是键值对应
             */

            value: function (Obj) {
                if (Obj instanceof Object) {
                    for (let val in Obj) if (Obj.hasOwnProperty(val) && typeof Obj[val] !== "string") return false;
                    return true;
                }
                return false;
            }
        },
        objName: {
            /**
             * @module 根据键值查找对象中含有此键值的第一个对象名称
             * @param{Object} Obj 要查找的对象
             * @param{string} key 键名
             * @param{string} value 值
             * @return{string} 找到的名称
             */

            value: function (Obj, key, value) {
                if (Obj instanceof Object && typeof key === "string" && typeof value === "string") {
                    let result;
                    for (let val in Obj) {
                        if (Obj.hasOwnProperty(val) && Obj[val] instanceof Object) {
                            for (const val1 in Obj[val]) {
                                if (val1 === key && Obj[val][val1] === value) return val;
                            }
                            result = Object.objName(Obj[val], key, value);
                            if (result) return result
                        }
                    }
                }
                return false;
            }
        }
    });
})();
