"use strict";
import Data from '../js/Data.js'

let Made = function () {

    let data = Data(), MadeHtml = function () {
        if (!(this instanceof MadeHtml)) throw new Error("this constructor must use new words!!");
        const _this = this, HtmlData = new data.HtmlData(), worker = function (Name, ...args) {
            if (HtmlData.hasOwnProperty(Name)) {
                return _this.madeBlock(_this.setHtmlData(Object.deepClone(HtmlData[Name]), ...args) || Object.deepClone(HtmlData[Name]));
            }
            return "";

        }, madeFunctionByName = function (...names) {
            let result = {};
            for (const name of names) {
                result[name] = function (...args) {
                    return worker.call(this, name, ...args);
                }
            }
            return result;
        };
        return madeFunctionByName(
            "head",
            "contentBlock",
            "footer",
            "transverseTab",
            "logo",
            "carousel",
            "websiteItem",
            "titleTab",
            "usernameLink",
            "notFound",
            "login_text",
            "website_more",
            "message",
            "allComment",
            "login"
        );

    }, Page = function () {
        if (!(this instanceof Page)) throw new Error("this constructor must use new words!!");
        const _this = this, pageData = function (name, callback) {
            _this.getPageData.call(this, name, function (data) {
                if (callback instanceof Function)
                    callback(data);
            });
        }, madeFunctionByName = function (...names) {
            let result = {};
            for (const name of names) {
                result[name] = function (callback, askKeyValue = "") {
                    pageData.call(this, name + askKeyValue, callback);
                    return this;

                }
            }
            return result;
        };
        return madeFunctionByName(
            "background",
            "carousel",
            "websiteItem",
            "titleTab"
        );
    };

    Page.prototype = {

        getPageData: function (dataName, callback) {
            if (typeof dataName === "string") {
                $.ajax({
                    url: "../php/request_reply.php",
                    data: `dataName=${dataName}`,
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        if (callback instanceof Function) {
                            callback(_f.Method.pageHtml(data));
                        }
                    },
                    error: function (x, t, e) {
                        if (!x.responseText) {
                            callback(_f.madeHtml.notFound())
                        }
                    }
                });

            }
        }


    };

    MadeHtml.prototype = {
        /**
         * @param{string} TagName HTML标签名称
         * @return{string} 返回HTML标签
         * @example
         *  HtmlTag("div") return "<div></div>"
         */
        htmlTag: function (TagName) {


            return !TagName || function () {
                if (typeof TagName === "string" && TagName.replace(/[A-Za-z0-9]/g, "").length === 0) {
                    return `<${TagName}></${TagName}>`;
                }
                return false;
            }();

        },
        // TODO 未解决嵌套标签的正确判断
        /**
         * @method 判断HTML标签正确性
         * @param{string} tagString HTML标签的String形式
         * @param{number} returnObj [0,1,otherNumber]是否返回HTML标签正则运算后的对象[不返回(默认),返回match运算对象,返回exec运算对象]
         * @return{boolean||Object}当returnObj=0时返回判断结果,否则返回上述对象
         * @example
         *  isTag("<div class="example" id='Example'>EXAMPLE</div>")    return true
         *  ...
         */
        isTag: function (tagString, returnObj = 0) {
            let tag = this.whatTag(tagString), regexp;
            if (!tag) return false;
            regexp = new RegExp(`(<${tag}((\\s+(\\s*(([A-Za-z_-]+)(?=\\s*=))(\\s*=)(\\s*".*"|\\s*'.*'))*\\s*>)|\\s*>).*(<\\/${tag}>))`, 'g');
            if (returnObj) return returnObj === 1 ? tagString.match(regexp) : regexp.exec(tagString);
            return tagString.match(regexp) instanceof Array;
        },
        /**
         * @method 返回HTML标签的名称
         * @param{string} HtmlTag HTML标签的String形式
         * @return{string||boolean} 返回String类型的标签名称||未找到HTML标签 false
         * @example
         *  whatTag("<div></div>") return "div"
         */
        whatTag: function (HtmlTag) {

            if (typeof HtmlTag === "string") {
                let tag = HtmlTag.match(/<(?=\/)\/(?=[A-Za-z0-9])[A-Za-z0-9]*(?=>)>/g) || false;
                if (tag && typeof tag[0] === "string") return tag[0].match(/[^</>]+/g).toString();
                else return false;
            }

            return false;
        },
        /**
         * @method 为HTML标签添加属性
         * @param{String} HtmlTag HTML标签的String形式
         * @param{Object||Array} Attrs 要添加的属性的对象集合 Array 添加少量属性的表达
         * @return{string||boolean} 返回添加属性后的标签||失败的添加，可能由于标签或属性集合的错误表达
         * @example
         * 0-->addAttr("<div></div>",{id:0,class:"test",style:{background:"#000",color:"#FFFFFF"}})
         *      return <div id="0" class="test" style="background:#000;color:#FFFFFF"></div>
         * 1-->addAttr("<div></div>","id",0,"class","test")
         *      return <div id="0" class="test"></div>
         */
        addAttr: function (HtmlTag, ...Attrs) {

            if (this.isTag(HtmlTag)) {
                if (Attrs.length === 0) return HtmlTag;
                const section = "<" + this.whatTag(HtmlTag);
                let block0 = HtmlTag.replace(new RegExp(section), ""), attrs = "";
                if (Attrs.length >= 2 && Attrs.length % 2 === 0) {
                    for (let i = 0; i < Attrs.length; i += 2) {

                        attrs += `${Attrs[i].replace(/_/g, "-")}="${Attrs[i + 1]}" `;
                    }
                } else if (Attrs[0] instanceof Object) {
                    let attrsObj = Attrs[0];
                    for (const val in attrsObj) {
                        if (attrsObj.hasOwnProperty(val)) {
                            attrs += val + "=\"" + (val.replace(/(style)/gi, "style") === "style"
                                ?
                                function () {
                                    let style = "";
                                    for (const i in attrsObj[val]) {
                                        if (attrsObj[val].hasOwnProperty(i))

                                            style += `${i.replace(/_/g, "-")}:${attrsObj[val][i]}; `;
                                    }
                                    return style.deleteEndNullChar();

                                }()
                                :
                                attrsObj[val]) + "\" ";
                        }
                    }
                }
                return section + (typeof attrs === "string" ? ` ${attrs}` : ``).deleteEndNullChar() + block0
            }
            return false;
        },
        /**
         * @method 在Html标签中添加内容
         * @param{string} htmlTag Html 标签
         * @param{string} value 要添加的内容
         */
        append: function (htmlTag, value) {
            if (this.isTag(htmlTag)) {
                const tail = `</${this.whatTag(htmlTag)}>`, regexp = new RegExp(tail, "g");
                return htmlTag.replace(regexp, "") + (value || "") + tail;
            }
            return false;
        },
        /**
         * @method 生成HTML块级元素
         * @param{Object}   data 块级元素的object保存形式 其中对象模板:{tagName:"div",style:{...any},children:[{...any},...],...}
         *                tagName为必选项并且以name为属性名的属性不会被解析,name为其块级元素名称,text属性确定其中文本内容
         * @return{string||boolean} 全部正确时返回块级元素否则返回false
         * @example
         *  madeBlock({
                            name: "name",
                            tagName: "div",
                            class: "classNames",
                            children:
                                [{
                                tagName: "div",
                                class: "className",
                                children:
                                [{
                                tagName: "a",
                                href: "#",
                                text: "text",
                                }]
                                }]
                        })
         return <div class="classNames"><div class="className"><a href="#">text</a></div></div>
         */
        madeBlock: function (data) {
            if (data instanceof Object) {
                let tag = "", attrs = {}, append = "";
                for (const val in data) {
                    if (data.hasOwnProperty(val) && val !== "name" && val !== "config") {
                        if (val === "children" || data[val] instanceof Array) {
                            for (const child in data[val]) {

                                if (data[val].hasOwnProperty(child))
                                    append += this.madeBlock(data[val][child]);
                            }


                        } else if (val === "tagName") {
                            tag = MadeHtml.prototype.htmlTag(data[val]);
                        } else if (val === "text") {
                            append += data[val] || "";
                        } else {
                            attrs[val] = data[val];
                        }
                    }
                }
                if (append === "false") return false;
                return this.append(this.addAttr(tag, attrs), append);
            }
        },
        /**
         * @method 设置Html对象 解析Data中的config对象
         * @param{Object} Data-Html原始对象.
         * @param{Object} setObj-需要添加的Html数据内容.
         * @return{Object} 设置成功后的Html对象.
         * @return{boolean} 设置失败返回false
         *
         */
        setHtmlData: function (Data, setObj) {
            if (!(Data instanceof Object) || !(setObj instanceof Object)) return false;
            const findFather = (obj, name) => {
                if (obj.hasOwnProperty("children")) {
                    if (obj.children instanceof Array) {
                        let temp;
                        for (const val of obj.children) {
                            if (val instanceof Object && val.hasOwnProperty("name") && val.name === name) return obj.children;
                            if (val.hasOwnProperty("children")) {
                                temp = findFather(val, name);
                                if (temp) return temp;
                            }
                        }
                    }

                }
                return false;
            };
            let mainMade = (data, setObj, config) => {
                let temp, _temp, __temp, _temp_, result = [], tf, cache, fast = (cache, Obj, value) => {
                    if (value.match(/(a_)(?=\S+)/g) && Obj[value].match(/^(text:'.+)(?=';href:')(';href:'.+)(';)$/gm)) {
                        let temp = Obj[value];
                        cache["text"] = temp.match(/'.+'(?=;href:')/gi)[0].replace(/^'|'$/gm, "");
                        cache["href"] = Obj[value].replace(/(text:)'.+'(?=;href:');/gm, "").match(/'.+'(?=;)/gm)[0].replace(/^'|'$/gm, "");
                    } else
                        cache[value] = Obj[value];


                };
                if (data instanceof Object && setObj instanceof Object && config instanceof Object) {
                    if (!config.hasOwnProperty("copyName") && !config.hasOwnProperty("setName") && !config.hasOwnProperty("children")) return false;
                    for (const value in setObj) {

                        if (setObj[value] instanceof Object) {
                            __temp = value === "children" ? setObj : setObj[value];
                            for (let val in __temp) {

                                temp = Object.findObject(data, "name", config["copyName"]) || data;

                                if (!__temp.hasOwnProperty(val)) return false;

                                _temp = __temp["children"];

                                tf = (val === "children" && _temp instanceof
                                    Object && config.hasOwnProperty("children") &&
                                    Object.len(_temp) === Object.len(config["children"]));
                                _temp_ = config["children"];
                                if (!tf) {
                                    cache = Object.findObject(temp, "name", config["setName"]/*||_temp_[val]["setName"]*/, 1);
                                    fast(cache, __temp, val);
                                    if (temp !== data)
                                        result.push(temp);
                                } else if (tf) {
                                    const len = __temp[val].hasOwnProperty("children") ? Object.len(_temp) - 1 : Object.len(_temp);
                                    let N = 0;
                                    for (let i = 0; i < len; i++) {
                                        if (_temp_[i].hasOwnProperty("copyName")) {
                                            let father = findFather(result[result.length - 1] || temp, _temp_[i]["copyName"]),
                                                newFather = mainMade(temp, _temp[i], _temp_[i]);
                                            for (const num in newFather) {
                                                N = Object.objName(father, "name", _temp_[i]["copyName"]);
                                                father[(+num) + (+N)] = newFather[num];
                                            }

                                        } else if (_temp_[i].hasOwnProperty("setName")) {
                                            for (const j in __temp[val][i]) {
                                                if (__temp[val][i].hasOwnProperty(j)) {

                                                    cache = Object.findObject(temp, "name", _temp_[i]["setName"], 1);
                                                    // cache[j] = __temp[val][i][j];
                                                    fast(cache, __temp[val][i], j);
                                                    // debugger;
                                                }

                                            }

                                        }
                                    }

                                }
                            }
                        } else {
                            temp = Object.findObject(data, "name", config["copyName"]) || data;
                            cache = Object.findObject(temp, "name", config["setName"], 1);
                            fast(cache, setObj, value);
                            if (temp !== data)
                                result.push(temp)
                        }
                    }
                    /*else {
                        /!*if (config.hasOwnProperty("children")) {
                            for (const last in config) {
                                temp = mainMade(Data, setObj, config[last]);
                                if (!temp) return false;
                                _temp_ = temp;
                                if (_temp_) Object.assign(_temp_, temp)
                            }
                            return _temp_;
                        }*!/
                        /!*&& !config.hasOwnProperty("children")*!/
                    }*/
                    cache = tf = undefined;
                    return result.length === 0 ? Object.deepClone(temp) : result;


                } else return false;

            };

            let made = mainMade(Data, setObj, Data.config) || "";

            if (made && !(made.hasOwnProperty("config"))) {
                for (const value in made) {
                    findFather(Data, Data.config["copyName"])[value] = made[value];
                }
                return Data;
            }
            return made;


        }


    };
    return {
        MadeHtml: MadeHtml,
        Page: Page
    };
};
export default Made;