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
            if($this->insert("INSERT INTO REVIEWS(UID,PID,COMMENT) VALUES(?,?,?)",array(intval($data['uid']),intval($data['pid']),$data['comment']),"iis")){
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
            $reviewData = $this->select("SELECT * FROM REVIEWS WHERE PID=?",array(intval($data['pid'])),"i");
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
    public function upvote($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            if($this->update("UPDATE REVIEWS SET UPS = UPS+1 WHERE ID=?",array(intval($data['id'])),"i")){
                return array("success"=>"upvoted");
            }
            else{
                return array("error"=>"cant upvote");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
    public function downvote($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            if($this->update("UPDATE REVIEWS SET DOWNS = DOWNS+1 WHERE ID=?",array(intval($data['id'])),"i")){
                return array("success"=>"downvoted");
            }
            else{
                return array("error"=>"cant downvote");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
}