<?php
       class Product{
              public function getProductSummary($productName){
                     return (new Amazon())->getProductSummary($productName);
              }
              public function getProductDetail($productName,$website){
                     return (new Amazon())->getProductDetails($productName,$website);
              }
       }