<?php
              define("PROJECT_ROOT_PATH", __DIR__ . "/../");

              require_once PROJECT_ROOT_PATH."./Controller/BaseController.php";
              require_once PROJECT_ROOT_PATH."./Model/Product.php";
              require_once PROJECT_ROOT_PATH."./vendor/autoload.php";
              require_once PROJECT_ROOT_PATH."./Service/crawler/amazon.crawler.php";