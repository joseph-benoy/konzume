<?php
require_once "BaseController.php";
require_once "./Model/Admin.php";
class AdminController extends BaseController{
    public function new(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $adminModel = new Admin();
                $data = json_encode($adminModel->newMessage($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "Admin model error!";
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