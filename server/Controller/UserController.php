<?php
ob_start();
require_once "BaseController.php";
require_once "./Model/User.php";
class UserController extends BaseController{
    /**
     * /user/usertemp endpoint
     */
    public function requestotp(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->insertTempUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }
    }
    /**
     * /user/createuser endpoint
     */
    public function createuser(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->createUserAccount($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }
    }
    /**
     * /user/getuser endpoint
     */
    public function getuser(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->createUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }
    }
    public function updateuser(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->updateUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }        
    }
    /**
     * verify opt
     */
    public function verifyotp(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->verifyTempUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }  
    }
    /**
     * login verification endpoint
     */
    public function login(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->verifyUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        }          
    }
    public function test(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='GET'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->test($_GET),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        } 
    }
    public function update(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->updateUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        } 
    }
    public function fetch(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->getUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        } 
    }
    public function deleteuser(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->deleteUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "USer model error!";
                   http_response_code(500);
            }
        }
        else{
                $strErrorDesc = 'Method not supported';
                http_response_code(422);
        }
        if(!$strErrorDesc){
                $this->sendOutput(array('Content-Type: application/json'),$data);
        }
        else{
                $this->sendOutput(array(),$strErrorDesc);
        } 
    }
}
ob_end_flush();