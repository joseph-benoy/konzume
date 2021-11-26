<?php
require_once "Database.php";
class User extends Database{
    /**
     * insert temporary user before OTP varification
     * @param array tempUserData
     */
    public function insertTempUser($tempUserData){
        if(count($tempUserData)!=1){
            return array("error"=>"parameter error");
        }
        if(!array_key_exists("email",$tempUserData)){
            return array("error"=>"no email");
        }
        $otp = rand(1000,9999);
        if($this->insert("INSERT INTO TEMP_USER(EMAIL,OTP)VALUES(?,?)",array(...array_values($tempUserData),$otp),"si")){
            return array("success"=>"created temp user");
        }
        else{
            return array("error"=>"parameter error");
        }
    }
    /**
     * create user permenant
     * @param array userData
     */
    public function createUser($userData){
        $this->insert('USER',$userData,"sssss");
    }
    /**
     * get the details of user based on email
     * @param string email
     */
    public function getUser($email){
        return "get user";
    }
    public function updateUser($email,$data){
        return "updated email";
    }
}