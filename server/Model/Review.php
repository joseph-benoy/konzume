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
                http_response_code(403);
                return array("error"=>"failed to insert");
            }
        }
        else{
            http_response_code(403);
            return array("error"=>"access denied");
        }
    }
    public function getReview($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            $reviewData = $this->select("SELECT REVIEWS.ID,REVIEWS.UID,REVIEWS.PID,REVIEWS.COMMENT,REVIEWS.UPS,REVIEWS.DOWNS,USER.FNAME,USER.LNAME FROM REVIEWS INNER JOIN USER ON REVIEWS.UID=USER.ID AND REVIEWS.PID=?",array(intval($data['pid'])),"i");
            if($reviewData!=false){
                return array("success"=>$reviewData);
            }
            else{
                http_response_code(403);
                return array("error"=>"falied to fetch data");
            }
        }
        else{
            http_response_code(403);
            return array("error"=>"access denied");
        }
    }
    public function upvote($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            $id = intval($data['uid'])+intval($data['id']);
            $bo = $this->insert("INSERT INTO REACTIONS VALUES(?,?,?,?)",array($id,intval($data['id']),intval($data['uid']),intval($data['type'])),"iiii");
            if($bo){
                if($this->update("UPDATE REVIEWS SET UPS = UPS+1 WHERE ID=?",array(intval($data['id'])),"i")){
                    return array("success"=>"upvoted");
                }
                else{
                    return array("error"=>"cant upvote");
                }            }
            else{
                http_response_code(403);
                return array("error"=>"failed to insert");
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
            $id = intval($data['uid'])+intval($data['id']);
            $bo = $this->insert("INSERT INTO REACTIONS VALUES(?,?,?,?)",array($id,intval($data['id']),intval($data['uid']),intval($data['type'])),"iiii");
            if($bo){
                if($this->update("UPDATE REVIEWS SET DOWNS = DOWNS+1 WHERE ID=?",array(intval($data['id'])),"i")){
                    return array("success"=>"downvoted");
                }
                else{
                    return array("error"=>"cant downvote");
                }            }
            else{
                http_response_code(403);
                return array("error"=>"failed to insert");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
}