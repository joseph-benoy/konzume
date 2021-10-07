<?php
       class Product{
              public function getProductSummary($productName){
                     return (new Scrapper())->getProductSummary($productName);
              }
       }