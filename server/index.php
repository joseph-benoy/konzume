<?php 
       require_once "./Controller/ProductController.php";
       require_once "./inc/bootstrap.php";
       $uri = parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
       $uri = explode("/",$uri);
       if($uri[1]=="product"){
              $productController = new ProductController();
              $productController->{$uri[2]}();
       }

