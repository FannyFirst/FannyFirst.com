<?php
/**
 * Created by PhpStorm.
 * User: Fanny
 * Date: 2019/8/17
 * Time: 15:59
 */
include "../php/Data.php";
include "../php/Database.php";
include "../php/Toolkit.php";


$set_POST_dataName = isset($_POST["dataName"]);
$set_POST_selectSingle = isset($_POST["selectName"]);
$data = new Data();
$setData = new Database();
function loggedInUser($userId)
{

}

function getWebsiteItemsByIds($ids = [])
{
    $websiteItems = [];
    if (!is_array($ids)) return $websiteItems;
    $database = new Database();
    $data = new Data();
    foreach ($ids as $itemId) {
        $tempOfLabels = [];
        $tempOfWebsiteItemObj = $database->getData("find_websiteItem_by_id", [$itemId]);
        if (isset($tempOfWebsiteItemObj->labels_id_json))
            $tempOfLabels = getLabelsByIds(json_decode($tempOfWebsiteItemObj->labels_id_json));
        if ($tempOfWebsiteItemObj)
            array_push($websiteItems, $data->websiteItem($tempOfWebsiteItemObj->icon_link
                , [$tempOfWebsiteItemObj->text, $tempOfWebsiteItemObj->link],
                $tempOfWebsiteItemObj->introduce, $tempOfLabels));
    }
    $websiteItems["multiple"] = true;
    return $websiteItems;
}

function getLabelsByIds($ids = [])
{

    $labels = [];
    if (!is_array($ids)) return $labels;
    $database = new Database();
    $temp = NULL;
    foreach ($ids as $labelId) {
        $temp = $database->getData("find_label_by_id", [$labelId]);
        array_push($labels, [$temp->text, $temp->link]);
    }
    unset($temp, $setData);
    return $labels;
}


if ($set_POST_dataName) {
    $pageName = "main";
    $feature = "1";
    if (isset($_POST["pageName"])) {
        $pageName = $_POST["pageName"];
    }
    if (isset($_POST["feature"])) {
        $feature = $_POST["feature"];
    }
    switch ($_POST["dataName"]) {
        case "background":
            $backgroundSet = $setData->getData("background", []);
            $background = $data->background(
                json_decode($backgroundSet->head_content),
                json_decode($backgroundSet->footer));
            echo $background;
            break;
        case "carousel":
            {
                $feature = "carousel";
                $carousel = $setData->getData("get_block_data", ["carousel", $pageName, $feature]);
                $carousel = $data->carousel(json_decode($carousel->data));
                echo json_encode(["carousel" => $carousel]);
                break;
            }
        case "websiteItem":
            {
                $websiteItems = [];
                $websiteItemIds = $setData->getData("get_block_data", ["websiteItem", $pageName, $feature]);
                if (!$websiteItemIds) {
                    echo "";
                    break;
                }
                $websiteItemIds = json_decode($websiteItemIds->data);
                $tempOfWebsiteItemObj = '';
                foreach ($websiteItemIds as $itemId) {
                    $tempOfLabels = [];
                    $tempOfWebsiteItemObj = $setData->getData("find_websiteItem_by_id", [$itemId]);
                    if (isset($tempOfWebsiteItemObj->labels_id_json))
                        foreach (json_decode($tempOfWebsiteItemObj->labels_id_json) as $labelId) {
                            $temp = $setData->getData("find_label_by_id", [$labelId]);
                            array_push($tempOfLabels, [$temp->text, $temp->link]);
                        }
                    if ($tempOfWebsiteItemObj)
                        array_push($websiteItems, $data->websiteItem($tempOfWebsiteItemObj->icon_link
                            , [$tempOfWebsiteItemObj->text, $tempOfWebsiteItemObj->link],
                            $tempOfWebsiteItemObj->introduce, $tempOfLabels));
                }

                $websiteItems["multiple"] = true;

                echo json_encode(["websiteItem" => $websiteItems]);
                break;
            }
        case "titleTab":
            {
                $titleTab = $setData->getData("get_block_data", ["titleTab", $pageName, $feature]);
                $titleTab = $data->titleTab(json_decode($titleTab->data));

                echo json_encode(["titleTab" => $titleTab]);
                break;
            }
        case "my":
            {
                if (isset($_POST["userId"])) {
                    $result = [];
                    $toolkit = new Toolkit();
                    $ip = $toolkit->getClientIp();
                    $loggedInObj = $setData->getData("select_user_login_by_user_id", [$_POST["userId"]]);
                    if (!is_null($loggedInObj) && is_object($loggedInObj)) {
                        if (property_exists($loggedInObj, "ip") && property_exists($loggedInObj, "login_time") && property_exists($loggedInObj, "expired_time")) {
                            if ($ip !== $loggedInObj->ip) {
                                $result = ["ip" => false];
                                echo json_encode($result);
                                return;
                            }
                            if ($lastLoginTime = $loggedInObj->login_time) {
                                try {
                                    $lastLoginTime = new DateTime($lastLoginTime);
                                    $lastLoginTime->add(new DateInterval('P1M'));
                                    if (strtotime(date("Y-m-d H:i:s")) > $lastLoginTime->getTimestamp()) {
                                        $result = ["time" => false];
                                        echo json_encode($result);
                                        return;
                                    }

                                } catch (Exception $e) {
//                                    echo $e;
                                    return;

                                }

                            }
                            $userInformation = $setData->getData("select_user_display_information_by_id", [$_POST["userId"]]);
                            if (!is_null($userInformation)) {
                                $result = [];
                                $username = $userInformation->username;
                                $savedWebsites = $userInformation->saved_website_information;
                                $deleteWebsites = $userInformation->delete_website_information;
                                $joinTime = $userInformation->join_time;
                                $mailboxId = $userInformation->mailbox_id;
                                if (!is_null($savedWebsites)) {
                                    $ids = [];
                                    foreach (json_decode($savedWebsites) as $id => $time) {
                                        array_push($ids, $id);
                                    }
                                    $savedWebsites = ["websiteItem" => getWebsiteItemsByIds($ids)];
                                }
                                if (!is_null($deleteWebsites)) {
                                    $ids = [];
                                    foreach (json_decode($deleteWebsites) as $id => $time) {
                                        array_push($ids, $id);
                                    }
                                    $deleteWebsites = ["websiteItem" => getWebsiteItemsByIds($ids)];
                                }
                                if (isset($_POST["feature"])) {
                                    switch ($_POST["feature"]) {
                                        case 1:
                                            {
                                                echo json_encode($savedWebsites);
                                                break;
                                            }
                                        case 2:
                                            {
                                                echo json_encode($deleteWebsites);
                                                break;
                                            }
                                    }
                                    return;
                                }
                                $result = ["username" => $username, "savedWebsites" => $savedWebsites,
                                    "deleteWebsites" => $deleteWebsites, "joinTime" => $joinTime, "mailboxId" => $mailboxId];

                                echo json_encode($result);
                            }


                        }
                    }

                } else {
                    echo json_encode(["userId" => null]);
                }

            }
        default:
            {
                echo "";
            }

    }
} elseif ($set_POST_selectSingle) {
    $feature = "";
    $userId = "";
    if (isset($_POST["feature"])) {
        $feature = $_POST["feature"];
    }
    switch ($_POST["selectName"]) {
        case "websiteItem":
            {
                $href = "";
                if (isset($_POST["href"]))
                    $href = $_POST["href"];
                else return false;
                switch ($feature) {
                    case "addMyList":
                        {
                            if (isset($_POST["userId"])) {
                                $websiteIdJson = $setData->getData("find_saved_website_by_userId", [$_POST["userId"]]);
                                $newWebsiteId = $setData->getData("find_id_by_link", [$href]);
                                if (!$websiteIdJson || !$newWebsiteId) return false;
                                $updateArray = [];
                                if ($websiteIdJson->saved_website_information == null) {
                                } else {
                                    $updateArray = json_decode($websiteIdJson->saved_website_information);
                                }
                                $id = $newWebsiteId->id;
                                if (is_object($updateArray)) {
                                    if (property_exists($updateArray, $id)) {
                                        echo "已经添加过了!!";
                                        break;
                                    } else {
                                        $updateArray->{$id} = date("Y-m-d H:i:s");
                                    }
                                } else
                                    $updateArray[$id] = date("Y-m-d H:i:s");
                                $setData->updateDatabase("update_user_saved_website_information", [json_encode($updateArray)]);
                                echo "添加成功!!";
                            }


                            break;
                        }
                    default:
                        {
                            echo "参数错误";
                        }
                }
            };
    }
}


