<?php
       require_once "./BaseController.php";
       require_once "./Model/Product.php";
       class ProductController extends BaseController{
              /**
               * /product/search endpoint
               */
              public function productsearch(){
                     $errorDesc = '';
                     $requestMethod = $_SERVER['REQUEST_METHOD'];
                     $queryParams = $this->getQueryParams();
                     if(strtoupper($requestMethod)=='GET'){
                            try{
                                   $productModel = new Product();
                                   $data = json_encode($productModel->getProductSummary($queryParams['p']));
                            }
                            catch(Error $e){
                                   $errorDesc = "Product model error!";
                                   $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                            }
                     }
                     else{
                            $strErrorDesc = 'Method not supported';
                            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
                     }
                     if(!$errorDesc){
                            $this->sendOutput(array('Content-Type: application/json', 'HTTP/1.1 200 OK'),$data);
                     }
                     else{
                            $this->sendOutput(array($strErrorHeader),$strErrorDesc);
                     }
              }
       }