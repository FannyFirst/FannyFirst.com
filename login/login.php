<?php
include "../php/Database.php";
include "../php/Toolkit.php";
$database = new Database();
$toolkit = new Toolkit();
/*
 * 待解决问题:
 *      注册限制
 *      */


if (isset($_POST["mode"]) && isset($_POST["username"]) && isset($_POST["password"])) {

    if ($_POST["mode"] === "login") {
        $id = $database->getData("check_user_pass", [$_POST["username"], $_POST["password"]]);
        if (!is_null($id) && property_exists($id, "id")) {
            $login = $database->updateDatabase("login_again", [$toolkit->getClientIp(), date("Y-m-d H:i:s"), $id->id], [2, "i"]);
            if ($login)
                echo $id->id;
            else echo "登陆失败...请稍后再试";
        } else {
            echo "用户名或密码不正确";
        }
    } elseif ($_POST["mode"] === "signUp") {
        $hasUsername = $database->getData("check_has_username", [$_POST["username"]]);
        if (is_null($hasUsername)) {
            $result = $database->updateDatabase("insert_new_user", [$_POST["username"], $_POST["password"]]);
            if ($result) {
                $id = $database->getData("check_user_pass", [$_POST["username"], $_POST["password"]]);
                if (!is_null($id) && property_exists($id, "id")) {
                    $login = $database->updateDatabase("login_first", [$id->id, $toolkit->getClientIp()], [0, "i"]);
                    if ($login)
                        echo $id->id;
                    else echo "自动登陆失败...请稍后再试";
                } else {
                    echo "自动登陆失败...请手动登陆";
                }
            } else echo "稍后再试...";
        } else {
            echo "用户已存在";
        }
    }
}
