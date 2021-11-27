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
        
    }
    public function generateToken($data){
        $token = array("data"=>$data);
        $jwt = JWT::encode($token,$this->secretKey);
        return $jwt;
    }
}