<?php
       class BaseController{
              /**
               * __call magic method to send error message when invalid endpoints are requested
               * @param string $name
               * @param mixed $arguments
               */
              public function __call($name, $arguments){
                     $this->sendOutput(array('HTTP/1.1 404 Not Found'));
              }
              /**
               * method to send the output as http response
               * @param array $httpHeader
               * @param string $data
               */
              public function sendOutput($httpHeader=array(),String $data="Something went wrong!"){
                     header_remove('Set-Cookie');
                     if(is_array($httpHeader)&&count($httpHeader)){
                            foreach($httpHeader as $http){
                                   header($http);
                            }
                     }
                     echo $data;
                     exit;
              }
       }