<?php
use \Firebase\JWT\JWT;
class JwtLogin{
    private $token;
    private $secretKey;
    public function __construct(){
        $this->secretKey = SECRET_KEY;
    }
    /**
     * token verification function
     */
    public function verify($jwt){
        if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            return false;
        }
        else{
            $jwt = $matches[1];
            if(!$jwt){
                return false;
            }
            else{
                try{
                    
                }
                catch(Exception $e){
                    return false;
                }
            }
        }
    }
    public function generateToken($data){
        $token = array("data"=>$data);
        $jwt = JWT::encode($token,$this->secretKey);
        return $jwt;
    }
}