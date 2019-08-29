<?php
/**
 * Created by PhpStorm.
 * User: ASUS
 * Date: 2019/8/17
 * Time: 16:00
 */

class Database
{
    final private function getContent()
    {
        $jsonStr = file_get_contents("../config/server.json");
        $arr = json_decode($jsonStr, true)["database"];

        $con = new mysqli($arr["host"], $arr["username"], $arr["password"]);
        if ($con)
            return $con;
        return false;

    }

    final private function getSql($sqlName)
    {
        $con = $this->getContent();
        $sql = "SELECT * FROM system.sql WHERE name = ?";
        $stmt = $con->stmt_init();
        $result = '';
        if ($stmt->prepare($sql)) {
            $stmt->bind_param("s", $sqlName);
            $stmt->execute();
            $result = $stmt->get_result();

        }
        $stmt->close();
        mysqli_close($con);
        if ($result !== null)
            return $result->fetch_object();
        return false;
    }

    final function log($con, $value)
    {
        /**/
    }


    public function getData($sqlName, $keyValue = ["*",], $special = ["where", "i,d,s,b"])
    {
        $sqlObj = $this->getSql($sqlName);
        if (!$sqlObj) return false;
        if ($sqlObj->param_num !== count($keyValue)) return false;
        $con = $this->getContent();
        $sqlStr = $sqlObj->text;
        $result = '';
        if ($sqlObj->param_num == 0 && $result = $con->query($sqlStr)) {
            mysqli_close($con);
            return $result->fetch_object();
        }
        $stmt = $con->stmt_init();
        $str = '';
        for ($i = 0; $i < $sqlObj->param_num; $i++) {
            if ($special[0] === $i) $str .= $special[1];
            else $str .= 's';
        }

        if ($stmt->prepare($sqlStr)) {

            $stmt->bind_param($str, ...$keyValue);
            $stmt->execute();
            $result = $stmt->get_result();
        }
        $stmt->close();
        mysqli_close($con);

        if ($result !== null)
            return $result->fetch_object();
        return false;
    }

    public function test()
    {
        $a = $this->getData("background", []);

        var_dump(json_decode($a->head_content));
    }

    public function updateDatabase($sqlName, $keyValue = ["value",], $special = ["where", "i,d,s,b"])
    {
        $sqlObj = $this->getSql($sqlName);
        if (!$sqlObj) return false;
        if ($sqlObj->param_num !== count($keyValue)) return false;
        $con = $this->getContent();
        $sqlStr = $sqlObj->text;
        $result = false;

        $stmt = $con->stmt_init();
        $str = '';
        for ($i = 0; $i < $sqlObj->param_num; $i++) {
            if ($special[0] === $i) $str .= $special[1];
            else $str .= 's';
        }
        if ($stmt->prepare($sqlStr)) {

            $stmt->bind_param($str, ...$keyValue);
            $stmt->execute();
            $result = $stmt->affected_rows;
        }
        $stmt->close();
        mysqli_close($con);
        if ($result)
            return $result;
        return false;

    }


}

//$database = new Database();
//$database->test();