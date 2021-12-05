<?php
require_once "Database.php";
class User extends Database{
    private function validateUserToken(){
        return (new JwtLogin())->verify();
    }
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
            $mail = new Mail();
            if($mail->sendMailApp($tempUserData['email'],urlencode("Verification code | Konzume"),urlencode("<h2>Your verfication code</h2><h1>{$otp}</h1>"),true)){
                return array("success"=>"otp send successfully");
            }
            else{
                return array("error"=>"otp failed");
            }
        }
        else{
            return array("error"=>"parameter error");
        }
    }
    public function verifyTempUser($data){
        if(count($data)!=2){
            return array("error"=>"parameter error");
        }
        if(!array_key_exists("email",$data)){
            return array("error"=>"no email");
        }
        if(!array_key_exists("otp",$data)){
            return array("error"=>"no otp");
        }
        $tempUserData = $this->select("SELECT * FROM TEMP_USER WHERE EMAIL=? AND OTP=?",array_values($data),"si");
        if($tempUserData!=false){
            if($this->update("UPDATE TEMP_USER SET VERIFIED =? WHERE EMAIL=?",array("yes",$data['email']),"ss")){
                return array("success"=>"verified the otp");
            }
            else{
                return array("error"=>"cant update tempuser verified");
            }
        }
        else{
            return array("error"=>"wrong otp");
        }
    }
    public function createUserAccount($data){
        if(count($data)!=4){
            return array("error"=>"parameter count error");
        }
        if(!array_key_exists("email",$data)){
            return array("error"=>"no email");
        }
        if(!array_key_exists("fname",$data)){
            return array("error"=>"no fname");
        }    
        if(!array_key_exists("lname",$data)){
            return array("error"=>"no lname");
        } 
        if(!array_key_exists("password",$data)){
            return array("error"=>"no password");
        }  
        $tempUserData = $this->select("SELECT * FROM TEMP_USER WHERE EMAIL=?",array($data['email']),"s");
        if($tempUserData!=false){
            if($tempUserData[0]["VERIFIED"]=="yes"){
                if($this->insert("INSERT INTO USER(FNAME,LNAME,EMAIL,PASS) VALUES(?,?,?,AES_ENCRYPT(?,?))",array(...array_values($data),DB_ENC_KEY),"sssss")){
                    if($this->delete("DELETE FROM TEMP_USER WHERE EMAIL=?",array($data['email']),"s")){
                        return array("success"=>"created user account");
                    }
                    else{
                        return array("error"=>"cant delete from otp table");
                    }
                }
                else{
                    return array("success"=>"cant insert to user table");
                }
            }
            else{
                return array("error"=>"otp verification is not done");
            }
        }
        else{
            return array("error"=>"otp verification is not done");
        }
    }
    public function verifyUser($data){
        if(count($data)!=2){
            return array("error"=>$data);
        }
        if(!array_key_exists("email",$data)){
            return array("error"=>"no email");
        }
        if(!array_key_exists("password",$data)){
            return array("error"=>"password");
        }  
        $userData = $this->select("SELECT ID,FNAME,LNAME,EMAIL,CAST(AES_DECRYPT(PASS,?) AS CHAR) AS PASSWORD FROM USER WHERE EMAIL=?",array(DB_ENC_KEY,$data['email']),"ss");
        if($userData!=false){
            if($userData[0]['PASSWORD']==$data['password']){
                $jwt = (new JwtLogin())->generateToken(array($userData[0]['ID'],$userData[0]['FNAME'],$userData[0]['LNAME'],$userData[0]['EMAIL']));
                return array("jwt"=>$jwt);
            }
            else{
                http_response_code(403);
                return array("error"=>"wrong password");
            }
        }
        else{
            return array("error"=>"username doesnot exits");
        }
    }
    public function updateUser($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            if(count($data)!=4){
                return array("error"=>"parameter count error");
            }
            if(!array_key_exists("email",$data)){
                return array("error"=>"no email");
            }
            if(!array_key_exists("fname",$data)){
                return array("error"=>"no fname");
            }    
            if(!array_key_exists("lname",$data)){
                return array("error"=>"no lname");
            } 
            if(!array_key_exists("password",$data)){
                return array("error"=>"no password");
            } 
            $updateStatus = $this->update("UPDATE USER SET FNAME=?,LNAME=?,EMAIL=?,PASS=AES_ENCRYPT(?,?) WHERE EMAIL=?",array($data['fname'],$data['lname'],$data['email'],$data['password'],DB_ENC_KEY,$tokenData->data[3]),"ssssss");
            if($updateStatus){
                return array("success"=>$updateStatus);
            }
            else{
                return array("error"=>"failed to update user");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
    public function getUser($data){
        $tokenData = $this->validateUserToken();
        if($tokenData){
            $email = $tokenData->data[3];
            $userData = $this->select("SELECT ID,FNAME,LNAME,EMAIL,CAST(AES_DECRYPT(PASS,?) AS CHAR) AS PASSWORD FROM USER WHERE EMAIL=?",array(DB_ENC_KEY,$email),"ss");
            if($userData!=false){
                return array("user"=>$userData);
            }
            else{
                return array("error"=>"cant fetch data");
            }
        }
        else{
            return array("error"=>"access denied");
        }
    }
}
