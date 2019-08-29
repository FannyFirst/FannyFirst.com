<?php
/**
 * Created by PhpStorm.
 * User: Fanny
 * Date: 2019/8/17
 * Time: 15:56
 */


class Data
{
    var $a = "!";

    final function madeLinkJson($text = ["text", "link"], $link = null)
    {
        if (is_array($text) && count($text) >= 2 && $link === null) {
            return 'text:\'' . $text[0] . '\';href:\'' . $text[1] . '\';';
        } else if (is_string($text) && is_string($link)) {
            return 'text:\'' . $text . '\';href:\'' . $link . '\';';
        } else {
            return false;
        }
    }

    final function addAttr()
    {


    }

    final function specialHtmlTag($tagName, $value = ["key" => "value",])
    {
        if (is_string($tagName) && is_array($value)) {
            $result = "<$tagName ";
            foreach ($value as $key => $val) {
                $result .= $key . "=" . $val . " ";
            }
            return preg_filter('/\s+$/m', "", $result) . ">";
        } else {
            return false;
        }
    }

    public function background($headContent = [["text", "link"],], $footer = [["title", [["text", "link"],]],], $contentBlock = null)
    {
        $result = [];
        $temp = [];
        if (is_array($headContent)) {
            foreach ($headContent as $value) {
                if (is_array($value) && count($value) >= 2) {
                    $temp['a_' . $value[0]] = $this->madeLinkJson($value);

                } else {
                    throw new Error("$headContent => $value is not array or length < 2");
                }
            }
            $result["head"] = $temp;
        }
        $result["contentBlock"] = ["key" => "value"];
        if (is_array($footer)) {
            $result["footer"] = [];
            foreach ($footer as $key => $value) {
                $temp = [];
                if (is_array($value) && is_string($value[0]) && is_array($value[1])) {
                    $temp["text"] = $value[0];
                    $temp["children"] = [[]];
                    foreach ($value[1] as $val) {

                        if (is_string($val[0]))
                            $temp["children"][0]["a_" . $val[0]] = $this->madeLinkJson($val);
                    }
                } else {
                    throw new Error("$footer => $value is not a array");
                }
                array_push($result["footer"], $temp);
            }
        }


        return json_encode($result);
    }

    public function carousel($imgAndLink = [["imgUrl", "link"],])
    {
        if (is_array($imgAndLink)) {
            $result = [];
            foreach ($imgAndLink as $key => $value) {
                if (is_array($value) && count($value) >= 2) {
                    $temp = $this->specialHtmlTag("img", ["src" => $value[0]]);
                    $result["a_" . $key] = $this->madeLinkJson([$temp, $value[1]]);
                }
            }
            return $result;
//            return json_encode(["carousel" => $result]);
        }
        return false;

    }

    public function websiteItem($favicon, $textAndLink, $introduce, $labels = [["text", "link"],])
    {
        if (is_string($favicon) && is_array($textAndLink) && is_string($introduce) && is_array($labels)) {
            $result = ["children" => []];
            $result["children"][0] = ["style" => ["background_image" => "url($favicon)"]];
            $result["children"][1] = ["a_" . $textAndLink[0] => $this->madeLinkJson($textAndLink)];
            $result["children"][2] = ["text" => $introduce];
            $result["children"][3] = [];
            foreach ($labels as $value) {
                if (is_array($value)) {
                    array_push($result["children"][3], ["a_" . $value[0] => $this->madeLinkJson($value)]);
                }
            }
            return $result;
        }
        return false;
    }

    public function titleTab($titleAndLink = ["title", [["text", "link"]]])
    {
        if (is_array($titleAndLink) && count($titleAndLink) >= 2) {
            $result["text"] = $titleAndLink[0];
            if (is_array($titleAndLink[1])) {
                $result["children"] = [];
                foreach ($titleAndLink[1] as $key => $value) {
//                    if($key)
                    if (is_array($value))
                        $result["children"][0]["a_" . $key] = $this->madeLinkJson($value);
                    else return false;
                }
            } else {
                return false;
            }
            return $result;
        }
        return false;
    }

}