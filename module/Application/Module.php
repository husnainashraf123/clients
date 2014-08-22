<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
        
        $serviceManager = $e->getApplication()->getServiceManager();
    $viewModel = $e->getApplication()->getMvcEvent()->getViewModel();

    $myService = $serviceManager->get('Clients\Modal\Client');

//    $viewModel->someVar= $myService->fetchAll();
//    error_reporting(E_ALL);
//            ini_set('display_errors', '1');
    $viewModel->someVar = $myService->ascfetchAll();
//    print_r("asdasdas");
//    print_r($viewModell);
//    print_r($viewModel->someVar);
//exit;
    $e->getViewModel()->setVariable('someVar2', $myService->fetchAll());
//    print_r($viewModel->someVar);exit;
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
