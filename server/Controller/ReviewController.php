<?php
require_once "BaseController.php";
require_once "./Model/Review.php";
class ReviewController extends BaseController{
    public function new(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $reviewModel = new Review();
                $data = json_encode($reviewModel->newReview($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "Review model error!";
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
    public function get(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod)=='POST'){
            try{
                $reviewModel = new Review();
                $data = json_encode($reviewModel->getReview($_POST),JSON_UNESCAPED_SLASHES);
            }
            catch(Error $e){
                   $errorDesc = "Review model error!";
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