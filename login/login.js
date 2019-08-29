$(document).ready(
    function () {
        let inputted = {mode: "signUp"};
        const check = function (username, password, mode, callback) {
            $.ajax({
                url: "login.php",
                type: "post",
                dataType: "text",
                data: `mode=${mode}&username=${username}&password=${password}`,
                success: function (data) {
                    if (callback instanceof Function)
                        callback(data);
                },
                error: function (x, e, t) {
                    if (callback instanceof Function)
                        callback("失败了稍后再试试吧~");

                    /*log*/
                }
            })
        };
        $("body").on("click", "#login-title,#signUp-title", function () {
            $("#login .active").removeClass("active");
            $(this).addClass("active");
            $("#form input").val(null).css("borderColor", "#7e5ba4");
            inputted = {};
            if (this.id === "login-title") {
                $("#password-input-again,#password_title-again").css("display", "none");
                $("#submit").html("登陆");

                inputted.mode = "login";
            } else {
                $("#password_title-again").css("display", "table-cell");
                $("#password-input-again").css("display", "inline-block");
                $("#submit").html("注册");
                inputted.mode = "signUp";
            }


        }).on("click", ".form-title", function () {
            $(this).css({
                transform: "none",
                cursor: "auto"
            });
            if (!this.nextElementSibling.focused)
                $(this.nextElementSibling).focus();
        }).on("hover", ".form-title", function () {
            $(this.nextElementSibling).css("box-shadow", "3px 3px 10px rgba(0, 0, 0, 0.75)")
        }, function () {
            $(this.nextElementSibling).attr("style", "")
        }).on("focus", "#form input", function () {
            this.focused = true;
            $(this.previousElementSibling).click();
            if (inputted[this.id]) this.style.borderColor = "#4caf50";
            else this.style.borderColor = "#7e5ba4";
            this.oninput = function () {
                this.value = this.value.replace(/[^A-Za-z0-9_.]/g, "");
            }
        }).on("focusout", "#form input", function () {
            this.focused = false;
            if (!this.value) {
                $(this.previousElementSibling).css({
                    transform: "translateX(20px) translateY(50px)",
                    cursor: "text"
                });
                this.style.borderColor = "#e91e63";
                inputted[this.id] = false;
            } else {
                inputted[this.id] = true;
                this.style.borderColor = "#4caf50";
            }
        }).on("focusout", "#password-input-again,#password-input", function () {
            if (this.value.length >= 1 && this.value.length < 6) {
                this.style.borderColor = "#e91e63";
                _f.Method.showMessage("密码至少有6位吧");
            }
            if (this.id === "password-input") {
                inputted.aPassword = this.value.length >= 6 ? 1 : 0;
            }
            let thatId = this.id === "password-input" ? "#password-input-again" : "#password-input";
            if ($(thatId).val() === this.value && this.value) {
                inputted.samePassword = true;
                $(`${thatId},${this.id}`).css("borderColor", "#4caf50");
            } else {
                if ($(thatId).val()) {
                    _f.Method.showMessage("两次密码不一致");
                    $(`${thatId},${this.id}`).css("borderColor", "#e91e63");
                }
                inputted.samePassword = false;
            }
        }).on("click", "#submit", function () {
            console.log(inputted);
            if (inputted.mode === "signUp" && !inputted.samePassword) {
                return false;
            } else if (inputted["username-input"] && inputted["password-input"] && inputted.aPassword) {
                check($("#username-input").val(), md5($("#password-input").val()),
                    inputted.mode, function (data) {
                        if (Number(data)) {
                            _f.Method.setCookie("login", data);
                            window.open("../my", "_self");
                        } else {
                            // $("body").append(data);
                            _f.Method.showMessage(data);
                        }
                    })
            }
        });

    }
)
;