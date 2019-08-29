"use strict";
let Data = function () {
    let HtmlData = function () {

        if (!(this instanceof HtmlData)) throw new Error("this object is a constructor");
        return {
            head: {
                config: {
                    copyName: "list",
                    setName: "link"
                },
                tagName: "div",
                id: "HeadBlock",
                children: [{
                    tagName: "div",
                    class: "Menu",
                    children: [{
                        tagName: "span",
                        id: "menu_0",
                        class: "menuLines"
                    }, {
                        tagName: "span",
                        id: "menu_1",
                        class: "menuLines"
                    }, {
                        tagName: "span",
                        id: "menu_2",
                        class: "menuLines"
                    }]
                }, {
                    tagName: "div",
                    id: "Logo",
                    children: [{
                        tagName: "a",
                        href: "/",
                        text: "FannyFirst.com"
                    }]
                }, {
                    tagName: "div",
                    id: "ContentList",
                    children: [{
                        tagName: "ul",
                        class: "TransverseTab",
                        children: [{
                            tagName: "li",
                            name: "list",
                            class: "TransverseTabContent",
                            children: [{
                                name: "link",
                                tagName: "a",
                                href: "javascript:;",
                                text: "链接"
                            }]
                        }]
                    }]
                }, {
                    tagName: "div",
                    class: "Search",
                    text: "<input id='SearchText' type='text' placeholder='网址/用户/...'>"
                }]
            },
            contentBlock: {
                tagName: "div",
                id: "ContentBlock",
                children: [{
                    tagName: "div",
                    id: "block0"
                }, {
                    tagName: "div",
                    id: "titleTabBlock_0"
                }, {
                    tagName: "div",
                    id: "websiteItemBlock_0",
                    style: {
                        min_height: "700px"
                    }
                }, {
                    tagName: "div",
                    id: "titleTabBlock_1"
                }, {
                    tagName: "div",
                    id: "websiteItemBlock_1",
                    style: {
                        min_height: "700px"
                    }
                }, {
                    tagName: "div",
                    id: "titleTabBlock_2"
                }, {
                    tagName: "div",
                    id: "websiteItemBlock_2",
                    style: {
                        min_height: "700px"
                    }
                }]
            },
            transverseTab: {
                config: {
                    setName: "link",
                    copyName: "list",
                },
                tagName: "ul",
                class: "TransverseTab",
                children: [{
                    name: "list",
                    tagName: "li",
                    class: "TransverseTabContent",
                    children: [{
                        name: "link",
                        tagName: "a",
                        href: "#",
                        text: "Test"
                    }]
                }]
            }, titleTab: {
                config: {
                    setName: "title",
                    children: [{
                        setName: "link",
                        copyName: "list"
                    }]
                },
                tagName: "ul",
                class: "titleTab",
                children: [{
                    tagName: "li",
                    children: [
                        {
                            tagName: "h1",
                            name: "title"
                        }]
                }, {
                    tagName: "li",
                    class: "HideUnderline",
                    name: "list",
                    children: [{
                        tagName: "a",
                        href: "javascript:void(0)",
                        text: "链接",
                        name: "link"
                    }]
                }]
            }, logo: {
                name: "Logo",
                tagName: "div",
                id: "Logo",
                children: [{
                    tagName: "a",
                    href: "/",
                    text: "FannyFirst.com"
                }]
            },
            footer: {
                config: {
                    copyName: "footer",
                    setName: "title",
                    children: [{
                        copyName: "list",
                        setName: "link"
                    }]
                },
                id: "FooterBlock",
                tagName: "div",
                children: [{
                    id: "Footer",
                    tagName: "div",
                    children: [
                        {
                            name: "footer",
                            tagName: "div",
                            class: "footerListBlock",
                            children: [{
                                tagName: "ul",
                                children: [{
                                    tagName: "li",
                                    children: [{
                                        name: "title",
                                        tagName: "h1",
                                        text: "标题"
                                    }]
                                }, {
                                    name: "list",
                                    tagName: "li",
                                    children: [{
                                        tagName: "h2",
                                        children: [
                                            {
                                                name: "link",
                                                tagName: "a",
                                                href: "javascript:void(0)",
                                                text: "链接"
                                            }
                                        ]
                                    }]
                                }]
                            }]
                        }
                    ]
                }]

            }, carousel: {
                config: {
                    copyName: "lists",
                    setName: "pictures",
                },
                tagName: "div",
                class: "carousel",
                children: [{
                    tagName: "ul",
                    class: "pictures",
                    style: {"margin-left": "0px"},
                    children: [
                        {
                            name: "lists",
                            tagName: "li",
                            children: [
                                {
                                    name: "pictures",
                                    tagName: "a",
                                    href: "javascript:;",
                                    text: ""
                                }
                            ]
                        }
                    ]
                }, {
                    tagName: "ul",
                    class: "tags",
                }]
            }, websiteItem: {
                config: {
                    children: [{
                        setName: "websiteIcon"
                    },
                        {
                            setName: "websiteName"
                        },
                        {
                            setName: "websiteIntroduce"
                        },
                        {
                            setName: "label",
                            copyName: "label"
                        }
                    ]
                },
                tagName: "div",
                class: "website-item",
                children: [{
                    name: "main",
                    tagName: "div",
                    style: {
                        display: "flex",
                        flex_wrap: "nowrap",
                        align_items: "center",
                        flex_grow: 1
                    },
                    children: [{
                        name: "websiteIcon",
                        tagName: "div",
                        class: "website-icon"
                    }, {
                        name: "websiteName",
                        tagName: "a",
                        class: "website-name-medium",
                        target: "_blank"
                    },

                        {
                            name: "websiteIntroduce",
                            tagName: "div",
                            class: "website-introduce"
                        },
                        {
                            tagName: "div",
                            class: "labels",
                            children: [
                                {
                                    name: "label",
                                    tagName: "a",
                                    class: "label",
                                    href: "javascript:void(0)"
                                }
                            ]

                        }]
                }, {
                    tagName: "div",
                    class: "menuButton"
                }]
            }, usernameLink: {
                config: {setName: "username"},
                tagName: "a",
                class: "username-large username-medium username-small",
                href: "javascript:void(0)",
                text: "UserName",
                name: "username"

            }, notFound: {
                tagName: "div",
                class: "notFound",
                text: "臣真的没有找到东西呢╮(╯▽╰)╭，可能真的没有叭(っ °Д °;)っ"
            },
            login_text: {
                tagName: "div",
                class: "login-text",
                children: [{
                    tagName: "a",
                    href: "#",
                    text: "登陆/注册"
                }]
            },
            website_more: {
                tagName: "div",
                class: "website-more",
                children: [{
                    tagName: "ul",
                    children: [{
                        tagName: "li",
                        text: "添加收藏",
                        index: 0
                    }, {
                        tagName: "li",
                        text: "访问",
                        index: 1
                    }/*, {
                        tagName: "li",
                        text: "查看详情",
                        index: 2
                    }, {
                        tagName: "li",
                        text: "评论",
                        index: 3
                    }*/
                    ]
                }]
            },
            message: {
                tagName: "div",
                class: "message"
            },
            allComment: {
                tagName: "div",
                id: "allComment"
            },
            login: {
                tagName: "div",
                id: "login",
                text: `<div style="height: 71px">
                <div id="signUp-title" class="active">注册</div>
                <div id="login-title">登陆</div>
            </div>
            <form id="form">
                <div id="username-title" class="form-title">填写用户名</div>
                <input type="text" id="username-input" autocomplete="username">
                <div id="password_title" class="form-title">填写密码</div>
                <input type="password" id="password-input" autocomplete="new-password">
                <div id="password_title-again" class="form-title">再次填写密码</div>
                <input type="password" id="password-input-again" autocomplete="new-password">
                <div id="submit">注册</div>
            </form>`
            }
        };
    };
    return {HtmlData: HtmlData}
};
export default Data