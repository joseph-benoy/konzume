<?php
       //require_once "../vendor/autoload.php";
       use simplehtmldom\HtmlWeb;
       class Search{
              private $client = null;
              private $baseWebsite = null;
              private $product = null;
              public function __construct($base,$product){
                     $this->baseWebsite = $base;
                     $this->product = $product;
                     $this->client = new HtmlWeb();
              }
              public function getProduct(){
                     $query = str_replace(' ',"%20",$this->product);
                     $query.="%20inurl:";
                     $html = $this->client->load('https://www.google.com/search?q='.$query.$this->baseWebsite);
                     $value = $html->find('a[href^=/url?]',0)->href;
                     return explode('/url?q=',explode('&sa',$value)[0])[1];
              }
       }
?>