<?php
       require_once "/media/joseph/Works/Web/Projects/konzume/server/vendor/autoload.php";
       use simplehtmldom\HtmlWeb;
       class Flipkart{
              private $productUrl = null;
              private $client = null;
              public function __construct()
              {
                     $this->client = new HtmlWeb();
              }
              public function getProduct($productName){
                     $baseUrl = "https://www.flipkart.com/search?q=".str_replace(' ',"+",$productName);
                     $html = $this->client->load($baseUrl);
                     $urlList = $html->find('._1fQZEK',0)->href;
                     return "https://www.flipkart.com".$urlList;
              }
              public function getProductDetails($productName){
                     $this->productUrl = $this->getProduct($productName);
                     $html = $this->client->load($this->productUrl);
                     $productRating = "";
                     if($html->find("span[class=_1lRcqv] div",0)!=null){
                            $productRating = explode("<img",$html->find("span[class=_1lRcqv] div",0)->innertext)[0];
                     }
                     return array(
                            "productUrl"=>explode("?",$this->productUrl)[0],
                            "productTitle"=>$productName,
                            "productRating"=>$productRating
                     );
              }
       }
       $x = new Flipkart();
       print_r($x->getProductDetails("samsung f12"));