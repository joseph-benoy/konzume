<?php
       require_once "../Service/scrapper.php";
       class Product{
              public function getProductSummary($productName){
                     return (new Scrapper())->getProductSummary($productName);
              }
       }