<?php
       require_once "search.php";
       require_once "/media/joseph/Works/Web/Projects/konzume/server/vendor/autoload.php";
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
                     return array("productUrl"=>$this->productUrl,'imgUrl'=>$value,'productTitle'=>$html->find('#productTitle',0)->innertext,"price"=>$price);
              }
              public function getProductDetails($productUrl){
                     $search = new Search($this->baseWebsite);
                     $this->productUrl = $productUrl;
                     $html = $this->client->load($this->productUrl);
                     $imgUrl = "";
                     $imgUrl = $html->find('#imgTagWrapperId img',0)->src;
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
                     $productTitle = $html->find('#productTitle',0)->innertext;
                     $aboutProduct = array();
                     $aboutListElement = $html->find("#feature-bullets ul",0);
                     $i=0;
                     foreach($aboutListElement as $aboutElement){
                            if($html->find("#feature-bullets ul li span",$i)!=null){
                                   array_push($aboutProduct,$html->find("#feature-bullets ul li span",$i)->innertext);
                            }
                            $i++;
                     }
                     $productRating = explode(" ",$html->find("#reviewsMedley span",0)->innertext)[0];
                     $productReviews = array();
                     $i=0;
                     $reviewListElements = $html->find('div[data-hook=review-collapsed] span');
                     foreach($reviewListElements as $reviewSpan){
                            if($i==4){
                                   break;
                            }
                            if($html->find('div[data-hook=review-collapsed] span',0)!=null){
                                   array_push($productReviews,$html->find('div[data-hook=review-collapsed] span',$i)->innertext);
                            }
                            $i++;
                     }
              }
       }
      $x = new Amazon();
      $x->getProductDetails("https://www.amazon.in/Samsung-Galaxy-Storage-Months-Replacement/dp/B096VD213D");
