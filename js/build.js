"use strict";
// import Made from "./Factory";

(function () {
    $(document).ready(function () {
        $("body").empty();
        const pathname = window.location.pathname, getPage = _f.page, setTabMap = function (blockId, i, map, num) {
            const key = $(`${blockId} .titleTab li a`);
            for (let a = 0; a < key.length; a++) {
                const mKey = key[a];
                if (mKey) {
                    map.set(mKey, $(`#websiteItemBlock_${i}`));
                    $(mKey).data("num", num++);
                    if (!a) $(mKey).parent().addClass("DisplayUnderline")
                }
            }
        }, carouselFun = function (blockId) {
            const ulp = $(`${blockId} .carousel .pictures`);
            const ult = $(`${blockId} .carousel .tags`);
            let num = ulp.children().length;
            for (let i = 0; i < num; i++) {
                ult.append("<li><a href='javascript:;'></a></li>");
                ult.find("a:last").data("location", i);
                if (!i) ult.find("a").addClass("active");
            }
            ult.find("a:last").data("location", "last");
            setInterval(function () {
                const select = `${blockId} .carousel ul:first`,
                    location = ult.find("a.active").data("location");
                if (location === "last") {
                    $(select).css("margin-left", 0);
                    ult.find("a.active").removeClass("active");
                    ult.find("li:first a").addClass("active");
                } else {
                    $(select).css("margin-left", -((location + 1) * 100) + "%");
                    ult.find("a.active").removeClass("active").parent("li").next("li").find("a").addClass("active");
                }


            }, 5000)

        }, tabReload = function (map, pageName, data) {
            $("body").on("click", ".titleTab a", function () {
                if (map.size) {
                    let addBlock = map.get(this);
                    if (addBlock) {
                        if (data) {
                            addBlock.empty();
                            _f.Method.SelectAjax(data + $(this).data("num"), function (data) {
                                if (data) {
                                    addBlock.append(_f.Method.pageHtml(data));
                                } else {
                                    addBlock.append(_f.madeHtml.notFound());
                                }

                            }, "json");

                        } else {
                            getPage.websiteItem(function (data) {
                                addBlock.empty().append(data);
                            }, `&pageName=${pageName}&feature=${$(this).data("num")}`);
                        }
                    }
                }
            });
        };
        getPage.background(function (data) {
            $("body").append(data);
            const
                [block0, titleBlock0, titleBlock1, titleBlock2, websiteBlock0, websiteBlock1, websiteBlock2] =
                    ["#block0", "#titleTabBlock_0", "#titleTabBlock_1", "#titleTabBlock_2", "#websiteItemBlock_0", "#websiteItemBlock_1", "#websiteItemBlock_2"];
            switch (pathname) {
                case "/": {
                    let map = new Map();
                    tabReload(map, "main");
                    getPage.carousel(function (data) {
                        $(block0).append(data);
                        carouselFun(block0);
                    }).titleTab(function (data) {
                            $(titleBlock0).append(data);
                        setTabMap(titleBlock0, 0, map, 1);
                        }, "&feature=1"
                    ).titleTab(function (data) {
                            $(titleBlock1).append(data);
                            setTabMap(titleBlock1, 1, map, 4);
                        }, "&feature=2"
                    ).titleTab(function (data) {
                            $(titleBlock2).append(data);
                            setTabMap(titleBlock2, 2, map, 6);
                        }, "&feature=3"
                    ).websiteItem(function (data) {
                            $(websiteBlock0).append(data);
                        }, "&feature=1"
                    ).websiteItem(function (data) {
                            $(websiteBlock1).append(data);
                        }, "&feature=4"
                    ).websiteItem(function (data) {
                        $(websiteBlock2).append(data);
                    }, "&feature=6");

                    break;
                }

                case "/rank/": {
                    let mapRank = new Map();
                    tabReload(mapRank, "rank");
                    $(`${block0},${titleBlock1},${titleBlock2},${websiteBlock1},${websiteBlock2}`).remove();
                    getPage.titleTab(function (data) {
                            $(titleBlock0).append(data);
                        }, "&pageName=rank&feature=1"
                    ).websiteItem(function (data) {
                        $(websiteBlock0).append(data);
                    }, "&pageName=rank&feature=2");
                    break;
                }

                case "/my/": {
                    let mapMy = new Map(), userId = _f.Method.getCookie("login");

                    $(`${titleBlock1},${titleBlock2},${websiteBlock1},${websiteBlock2}`).remove();
                    getPage.titleTab(function (data) {
                            $(titleBlock0).append(data);
                            setTabMap(titleBlock0, 0, mapMy, 1);
                        }, "&pageName=my&feature=1"
                    );
                    if (userId) {
                        tabReload(mapMy, "my", `dataName=my&userId=${userId}&feature=`);
                        _f.Method.SelectAjax(`dataName=my&userId=${userId}`, function (data) {
                            if (data instanceof Object && data.hasOwnProperty("username") && data.hasOwnProperty("savedWebsites")) {
                                $(block0).addClass("username-block").empty().append(_f.madeHtml.usernameLink({
                                    text: data.username,
                                    class: "username-large"
                                }));
                                $(websiteBlock0).append(_f.Method.pageHtml(data.savedWebsites));
                            }

                        }, "json");
                    } else {
                        $(block0).addClass("username-block").append(_f.madeHtml.login_text());
                    }


                    break;
                }
                case "/website/": {
                    $(`${titleBlock0},${titleBlock1},${titleBlock2},${websiteBlock0},${websiteBlock1},${websiteBlock2}`).remove();
                    $("#ContentBlock").append(_f.madeHtml.allComment());
                    break;
                }
                case "/login/": {
                    $(`${titleBlock0},${titleBlock1},${titleBlock2},${websiteBlock0},${websiteBlock1},${websiteBlock2}`).remove();
                    $("#block0").css("text-align", "center").append(_f.madeHtml.login())

                }

            }
            console.log(pathname);
        });


    });
})();
/*Effect*/
(function () {
    $(document).ready(function () {
        $("body").on("click", ".HideUnderline a", function () {
            $(this).parents(".titleTab").children("li").removeClass("DisplayUnderline");
            $(this).parents("li").addClass("DisplayUnderline");
        }).on("click", ".Menu", function () {
            const [m0, m1, m2] = ["#menu_0", "#menu_1", "#menu_2"];
            if ($(this).data("opened") === 1) {
                $(this).css("transform-origin", "50% 50%");
                $(m0).css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $(m1).css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $(m2).css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $(this).data("opened", 0);
                return;
            }
            $(m0).css({
                "animation": "Rotate0 .3s",
                "transform": "rotate(45deg)"
            });
            $(m1).css({
                "animation": "flyOut .3s",
                "transform": "scaleX(0)"
            });
            $(m2).css({
                "animation": "Rotate1 .3s",
                "transform": "rotate(-45deg)"
            });
            $(this).data("opened", 1);
        }).on("click", ".tags li a", function () {
            let location = $(this).data("location");
            if (location === "last" || typeof location === "number") {
                if (location === "last") location = $(this).parents(".carousel").children(".pictures").length;
                $(this).parents(".carousel").children(".pictures").css("margin-left", -((location) * 100) + "%");
                $(this).parents(".tags").find("a").removeClass("active");
                $(this).addClass("active");
            }
        }).on("click", ".website-item .menuButton", function () {
            const ClassName = ".website-more", remove = function () {
                $(ClassName).remove(":last");
            };
            $("body").append(_f.madeHtml.website_more()).one("click", remove);
            const listWidth = $(ClassName)[0].clientWidth, listHeight = $(ClassName)[0].clientHeight,
                rectObj = this.getBoundingClientRect(), top = Math.ceil(window.innerHeight - rectObj.top),
                left = Math.ceil(window.innerWidth - rectObj.left),
                href = $(this).parents(".website-item").find(".website-name-medium").attr("href"),
                listActive = function (index, href) {
                    switch (index) {
                        case 0: {
                            const id = _f.Method.getCookie("login");
                            if(id)
                            _f.Method.SelectAjax(`selectName=websiteItem&feature=addMyList&href=${href}&userId=${id}`, function (data) {
                                // $("body").append(data)
                                _f.Method.showMessage(data);
                            });
                            else {
                                _f.Method.showMessage("先登陆下才可以保存呢ヾ(≧へ≦)〃");
                            }
                            break;
                        }
                        case 1: {
                            window.open(href, "_blank");
                            /*_f.Method.SelectAjax(`selectName=websiteItem&feature=visit&href=${href}&userId=${1}`, function (data) {
                                // 访问记录
                            });*/
                            break;
                        }
                        case 2: {
                            window.open(`../website/?href=${href}`, "_self");
                            /*_f.Method.SelectAjax(`selectName=websiteItem&feature=more&href=${href}&userId=${1}`, function (data) {
                                // 更多页面记录
                            });*/
                            break;
                        }
                        case 3: {
                            _f.Method.showMessage("所有用户分享网站到10000条才开放评论等功能呢");
                            // window.open(`../website/?href=${href}#allComment`, "_self");
                            /*_f.Method.SelectAjax(`selectName=websiteItem&feature=comment&href=${href}&userId=${1}`, function (data) {
                                // 评论记录
                            });*/
                            break;
                        }
                        default : {
                            _f.Method.showMessage("没有这个操作╥﹏╥...");
                            return false;
                        }
                    }
                };

            $(ClassName).css({
                top: top - listHeight >= 0 ? this.offsetTop : this.offsetTop - listHeight + this.clientHeight - 10,
                left: left - listWidth >= 0 ? this.offsetLeft : this.offsetLeft - listWidth + this.clientWidth - 10
            }).on("click", "li", function () {
                // console.log(Number($(this).attr("index")));
                listActive(Number($(this).attr("index")), href);
            })

        }).on("click", ".website-name-medium,.website-name-large,.website-name-small", function () {

            /*_f.Method.SelectAjax(`selectName=websiteItem&feature=visit&host=${this.host}&userId=${1}`, function (data) {
                //访问记录
                console.log(data);
            });*/
        });
    });

})();