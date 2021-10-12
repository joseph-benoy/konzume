<?php
       class Product{
              public function getProductSummary($productName){
                     return (new Amazon())->getProductSummary($productName);
              }
              public function getProductDetail($productUrl,$website){
                     if($website=="amazon"){
                            return (new Amazon())->getProductDetails($productUrl);
                     }
              }
              public function getTrusted($productUrl){
                     return (new Amazon())->getTrusted($productUrl);
              }
       }