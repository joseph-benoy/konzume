<?php
       require_once "BaseController.php";
       require_once "./Model/Product.php";
       class ProductController extends BaseController{
              /**
               * /product/search endpoint
               */
              public function searchproduct(){
                     $errorDesc = '';
                     $requestMethod = $_SERVER['REQUEST_METHOD'];
                     $queryParams = $this->getQueryParams();
                     if(strtoupper($requestMethod)=='GET'){
                            try{
                                   $productModel = new Product();
                                   $data = json_encode($productModel->getProductSummary($queryParams['p']),JSON_UNESCAPED_SLASHES);
                            }
                            catch(Error $e){
                                   $errorDesc = "Product model error!";
                                   http_response_code(500);
                            }
                     }
                     else{
                            $strErrorDesc = 'Method not supported';
                            http_response_code(422);
                     }
                     if(!$errorDesc){
                            $this->sendOutput(array('Content-Type: application/json'),$data);
                     }
                     else{
                            $this->sendOutput(array(),$strErrorDesc);
                     }
              }
       }