<?php

namespace Auth\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Authentication\Result;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\Db\Adapter\Adapter as DbAdapter;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Auth\Model\Auth;
use Auth\Form\AuthForm;
use Auth\Form\ForgottenPasswordForm;

class IndexController extends AbstractActionController {

    public function indexAction() {
        return new ViewModel();
    }

    public function loginAction() {
         if ($user = $this->identity()) {
              return $this->redirect()->toUrl('/clients/list');
         }
        $user = $this->identity();
        $form = new AuthForm();
        $forgetpasswordform = new ForgottenPasswordForm();
        $form->get('submit')->setValue('Login');
        $messages = null;

        $request = $this->getRequest();
        if ($request->isPost()) {
            $authFormFilters = new Auth();
            $form->setInputFilter($authFormFilters->getInputFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $data = $form->getData();
                $sm = $this->getServiceLocator();
                $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');

                $authAdapter = new AuthAdapter($dbAdapter, 'users', // there is a method setTableName to do the same
                        'usr_name', // there is a method setIdentityColumn to do the same
                        'usr_password' // there is a method setCredentialColumn to do the same
                       // "MD5(CONCAT('$staticSalt', ?, usr_password_salt)) AND usr_active = 1" // setCredentialTreatment(parametrized string) 'MD5(?)'
                );
                
                $cryptKey  = 'qJB0rGtIn5UB1xG03efyCp';
                $q=$data['usr_password'];
                $data['usr_password'] = base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), $q, MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ) );
                $authAdapter
                        ->setIdentity($data['usr_name'])
                        ->setCredential($data['usr_password'])
                ;

                $auth = new AuthenticationService();
                $result = $auth->authenticate($authAdapter);

                switch ($result->getCode()) {
                    case Result::FAILURE_IDENTITY_NOT_FOUND:
                        // do stuff for nonexistent identity
                        break;

                    case Result::FAILURE_CREDENTIAL_INVALID:
                        // do stuff for invalid credential
                        break;

                    case Result::SUCCESS:
                        $storage = $auth->getStorage();
                        $storage->write($authAdapter->getResultRowObject(
                                        null, 'usr_password'
                        ));
                        $time = 1209600; // 14 days 1209600/3600 = 336 hours => 336/24 = 14 days
//						if ($data['rememberme']) $storage->getSession()->getManager()->rememberMe($time); // no way to get the session
                        if ($data['rememberme']) {
                            $sessionManager = new \Zend\Session\SessionManager();
                            $sessionManager->rememberMe($time);
                        }
                        break;

                    default:
                        // do stuff for other failure
                        break;
                }
                if($result->isValid()){
                    return $this->redirect()->toUrl('/clients/list');
                }else{
                     $messages="Username or Password is incorrect";
                }
            }
        }
        $view = new ViewModel(array('form' => $form,'forgotpasswordform' => $forgetpasswordform, 'message' => $messages));
        $view->setTerminal(true);
        return $view;
    }

    public function logoutAction() {
        $auth = new AuthenticationService();
        // or prepare in the globa.config.php and get it from there
        // $auth = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');

        if ($auth->hasIdentity()) {
            $identity = $auth->getIdentity();
        }

        $auth->clearIdentity();
//		$auth->getStorage()->session->getManager()->forgetMe(); // no way to get the sessionmanager from storage
        $sessionManager = new \Zend\Session\SessionManager();
        $sessionManager->forgetMe();

        return $this->redirect()->toRoute('auth/default', array('controller' => 'index', 'action' => 'login'));
    }

}
