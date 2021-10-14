<?php
       require_once "search.php";
       require_once "/media/joseph/Works/Web/Projects/konzume/server/vendor/autoload.php";
       use simplehtmldom\HtmlWeb;
       class Flipkart{
              private $baseWebsite = "flipkart";
              private $productUrl = null;
              private $client = null;
              public function __construct()
              {
                     $this->client = new HtmlWeb();
              }
              public function getProductDetails($productName){
                     $search = new Search($this->baseWebsite,$productName);
                     $this->productUrl = $search->getProduct();
                     $html = $this->client->load($this->productUrl);
                     $productRating = "";
                     if($html->find("span[class=_1lRcqv] div",0)!=null){
                            $productRating = explode("<img",$html->find("span[class=_1lRcqv] div",0)->innertext)[0];
                     }
                     return array(
                            "productUrl"=>$this->productUrl,
                            "productTitle"=>$productName,
                            "productRating"=>$productRating
                     );
              }
       }