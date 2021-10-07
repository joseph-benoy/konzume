<?php
       require_once "../../vendor/autoload.php";
       require_once "../search.php";
       use simplehtmldom\HtmlWeb;
       class Amazon{
              private $baseWebsite = "amazon";
              private $productUrl = null;
              private $client = null;
              public function __construct()
              {
                     $this->client = new HtmlWeb();
              }
              public function getProductSummary(string $productName){
                     $search = new Search($this->baseWebsite,$productName);
                     $this->productUrl = $search->getProduct();
                     $html = $this->client->load($this->productUrl);
                     $value = "";
                     $value = $html->find('#imgTagWrapperId img',0)->src;
                     $price = null;
                     if($html->find('#priceblock_dealprice',0)!=NULL){
                            $price = $html->find('#priceblock_dealprice',0)->innertext;
                     }
                     elseif($html->find('#priceblock_ourprice',0)!=NULL){
                            $price = $html->find('#priceblock_ourprice',0)->innertext;
                     }
                     else{
                            $price = "Not available";
                     }
                     print_r(array('productUrl'=>$this->productUrl,'imgUrl'=>$value,'productTitle'=>$html->find('#productTitle',0)->innertext,"price"=>$price));
                     return array('productUrl'=>$this->productUrl,'imgUrl'=>$value,'productTitle'=>$html->find('#productTitle',0)->innertext,"price"=>$price);
              }
       }
       $x = new Amazon();
       $x->getProductSummary("Vivo Y51A");       
       //$x->getProductSummary("iphone 12");