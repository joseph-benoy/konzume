<?php
require_once "Database.php";
class Admin extends Database{
    public function saveMessage($data){
        if($this->insert("INSERT INTO MESSAGES(NAME,EMAIL,MESSAGE) VALUES(?,?,?)",array_values($data),"sss")){
            return array("success"=>"message sent successfully");
        }
        else{
            http_response_code(403);
            return array("error"=>"message failed to send");
        }
    }
}