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
                     echo $this->productUrl."\n";
                     $value = $html->find('#imgTagWrapperId img',0)->src;
                     echo $value."\n";
                     echo $html->find('#productTitle',0)->innertext."\n";
                     var_dump($html->find('#priceblock_ourprice'));
              }
       }
       $x = new Amazon();
       $x->getProductSummary("iphone 12");