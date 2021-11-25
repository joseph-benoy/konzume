<?php
require_once "BaseController.php";
require_once "./Model/User.php";
class UserController extends BaseController{
    /**
     * /user/usertemp endpoint
     */
    public function usertemp(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $userModel = new User();
                $data = json_encode($userModel->insertTempUser($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "Product model error!";
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