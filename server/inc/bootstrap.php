<?php
              define("PROJECT_ROOT_PATH", __DIR__ . "/../");

              require_once PROJECT_ROOT_PATH."./Controller/BaseController.php";
              require_once PROJECT_ROOT_PATH."./Model/Product.php";
              require_once PROJECT_ROOT_PATH."./vendor/autoload.php";
              require_once PROJECT_ROOT_PATH."./Service/crawler/amazon.crawler.php";
              require_once PROJECT_ROOT_PATH."./Service/crawler/flipkart.crawler.php";
              require_once PROJECT_ROOT_PATH."./inc/config.php";
              require_once PROJECT_ROOT_PATH."./Model/User.php";
              require_once PROJECT_ROOT_PATH."./Service/mail/Mail.php";
              require_once PROJECT_ROOT_PATH."./Service/jwt/Jwt.php";

