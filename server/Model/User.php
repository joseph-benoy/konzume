<?php
require_once "Database.php";
class User extends Database{
    /**
     * insert temporary user before OTP varification
     * @param array tempUserData
     */
    public function insertTempUser($tempUserData){
        return "inserted temp user";
    }
    /**
     * create user permenant
     * @param array userData
     */
    public function createUser($userData){
        $this->insert('USER',$userData,"sssss");
    }
}