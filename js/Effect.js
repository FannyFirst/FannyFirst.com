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
        });
    });

})();