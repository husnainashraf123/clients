<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

/**
* This makes our life easier when dealing with paths. Everything is relative
* to the application root now.
*/
chdir(dirname(__DIR__));
require_once getcwd(). '/vendor/Classes/PHPExcel/PHPExcel.php';
require_once getcwd(). '/vendor/Classes/PHPExcel/PHPExcel/Writer/Excel2007.php'; 
require_once getcwd(). '/vendor/Classes/PHPExcel/PHPExcel/IOFactory.php'; 
require_once getcwd(). '/vendor/Classes/gapi.php'; 

//require_once getcwd(). '/vendor/Classes/Google/Google_Client.php'; 
//require_once getcwd(). '/vendor/Classes/Google/contrib/Google_AnalyticsService.php'; 

//require_once getcwd(). '/vendor/Classes/ZendGData/App.php'; 
//require_once getcwd(). '/vendor/Classes/ZendGData/GData.php'; 
//require_once getcwd(). '/vendor/Classes/ZendGData/Analytics.php'; 
//require_once getcwd(). '/vendor/Classes/ZendGData/ClientLogin.php'; 

//require_once getcwd(). '/vendor/Classes/Gdata/Analytics.php'; 
//require_once getcwd(). '/vendor/Classes/GData/ClientLogin.php'; 

//require_once getcwd(). '/vendor/Classes/PHPExcel/PHPExcel/Autoloader.php'; 
// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
    return false;
}

// Setup autoloading
require 'init_autoloader.php';

// Run the application!
Zend\Mvc\Application::init(require 'config/application.config.php')->run();
// require './vendor/Classes/PHPExcel/PHPExcel.php'; 
// require './vendor/Classes/PHPExcel/PHPExcel/Writer/Excel2007.php'; 
