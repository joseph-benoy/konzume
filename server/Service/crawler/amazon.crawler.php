<?php
       require_once "/media/joseph/Works/Web/Projects/konzume/server/vendor/autoload.php";
       use GuzzleHttp\Client;
       use simplehtmldom\HtmlWeb;
       class Amazon{
              private $baseWebsite = "amazon";
              public function getReviews(string $productName){
                     echo "review";
              }
              public function getProduct(string $productQuery){
                     $query = str_replace(' ',"%20",$productQuery);
                     $query.="%20inurl:";
                     $this->client = new HtmlWeb();
                     $html = $this->client->load('https://www.amazon.in/s?k=iphone+12&ref=nb_sb_noss_2');
                     foreach($html->find('.a-section .a-spacing-medium a') as $element){
                            echo $element->href."\n\n\n";
                            var_dump($element);
                            break;
                     }
              }
       }
       $x = new Amazon();
       $x->getProduct('iphone 12');