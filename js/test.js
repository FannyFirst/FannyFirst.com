import Made from '../js/Factory.js'

(function () {

    $(document).ready(function () {

        $(".HideUnderline").click(function () {
            $(".HideUnderline").removeClass("DisplayUnderline");
            $(this).addClass("DisplayUnderline");
        });
        $(".Search input").focus(function () {
            // $(".Search").addClass("DisplayUnderline");
        }).blur(function () {
            // $(".Search").removeClass("DisplayUnderline");
        });
        $(".Menu").click(function () {
            if ($(this).data("opened") === 1) {
                $(this).css("transform-origin", "50% 50%");
                $("#menu_0").css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $("#menu_1").css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $("#menu_2").css({
                    "animation": "flyIn .3s",
                    "transform": "rotate(0)"
                });
                $(this).data("opened", 0);
                return;
            }
            $("#menu_0").css({
                "animation": "Rotate0 .3s",
                "transform": "rotate(45deg)"
            });
            $("#menu_1").css({
                "animation": "flyOut .3s",
                "transform": "scaleX(0)"
            });
            $("#menu_2").css({
                "animation": "Rotate1 .3s",
                "transform": "rotate(-45deg)"
            });
            $(this).data("opened", 1);
        });
        // const _h = window._f.madeHtml;
        /*$("#FooterBlock").append(_h.footer(
            {
                text: "标题呢",
                children: [{
                    a_link: "text:'链接呢';href:'#';",
                    a_link1: "text:'链接呢';href:'#';",
                    a_link2: "text:'链接呢';href:'#';",
                    a_link3: "text:'链接呢';href:'#';",
                }]
            }, {
                text: "标题呢",
                children: [{
                    a_link: "text:'链接呢';href:'#';",
                    a_link1: "text:'链接呢';href:'#';",
                    a_link2: "text:'链接呢';href:'#';",
                }]
            }, {
                text: "标题呢",
                children: [{
                    a_link: "text:'链接呢';href:'#';",
                    a_link1: "text:'链接呢';href:'#';",
                    a_link2: "text:'链接呢';href:'#';",
                    a_link3: "text:'链呢';href:'#';",
                }]
            }, {
                text: "标题呢",
                children: [{
                    a_s: "text:'链接呢';href:'#';",
                    a_link1: "text:'链接呢';href:'#';",
                    a_link2: "text:'链接呢';href:'#';",
                    a_link3: "text:'链接呢';href:'#';",
                }]
            }
            )
        );*/


    });


})();