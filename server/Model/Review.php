<?php
require_once "Database.php";
class Review extends Database{
    private function validateUserToken(){
        return (new JwtLogin())->verify();
    }
    public function newReview($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            if($this->insert("INSERT INTO REVIEW(UID,PID,COMMENT) VALUES(?,?,?)",array_values($data),"iis")){
                return array("success"=>"inserted successfully");
            }
            else{
                return array("error"=>"failed to insert");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
    public function getReview($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            $reviewData = $this->select("SELECT * FROM REVIEW WHERE PID=?",array($data['pid']),"i");
            if($reviewData!=false){
                return array("success"=>$reviewData);
            }
            else{
                return array("error"=>"falied to fetch data");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
}