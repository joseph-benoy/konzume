<?php
require_once "Database.php";
       class Product extends Database{
              public function getProductSummary($productName){
                     return (new Amazon())->getProductSummary($productName);
              }
              public function getProductDetail($productUrl,$website="amazon"){
                     if($website=="amazon"){
                            return (new Amazon())->getProductDetails($productUrl);
                     }
              }
              public function getTrusted($productUrl){
                     return (new Amazon())->getTrusted($productUrl);
              }
              public function getFlipkart($productName){
                     return (new Flipkart())->getProductDetails($productName);
              }
              public function save($data){
                     if($this->insert("INSERT INTO PRODUCT(NAME,URL) VALUES(?,?)",array_values($data),"ss")){
                            return array("success"=>"inserted product successfully");
                     }
                     else{
                            return array("error"=>"falied to insert");
                     }
              }
              public function getProduct($data){
                     $productData = $this->select("SELECT * FROM PRODUCT WHERE NAME=? OR URL=?",array_values($data),"ss");
                     if($productData!=false){
                            return array("success"=>$productData);
                     }
                     else{
                            return array("error"=>"falied to fetch product");
                     }
              }
       }
