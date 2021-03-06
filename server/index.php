<?php 
ob_start();
require_once "./Controller/ProductController.php";
require_once "./Controller/UserController.php";
require_once "./Controller/ReviewController.php";
require_once "./Controller/AdminController.php";
require_once "./inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
$uri = explode("/",$uri);
if($uri[1]=="product"){
       $productController = new ProductController();
       $productController->{$uri[2]}();
}
else if($uri[1]=="user"){
       $userController = new UserController();
       $userController->{$uri[2]}();
}
else if($uri[1]=="review"){
       $reviewController = new ReviewController();
       $reviewController->{$uri[2]}();
}
else if($uri[1]=="admin"){
       $reviewController = new AdminController();
       $reviewController->{$uri[2]}();
}
ob_end_flush();