<?php

namespace Auth\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Db\TableGateway\TableGateway;
use Auth\Form\UserForm;
use Auth\Form\UserFilter;
use Clients\Model\UserRight;
use Clients\Model\UserRightTable;
use Zend\Session\Container;

class AdminController extends AbstractActionController {

    protected $usersTable = null;

    // R - retrieve = Index
    public function indexAction() {
        $session = new Container('link');
        $delete_msg = $session->offsetGet('delete_user_msg');
        if (isset($delete_msg) && $delete_msg != '') {
            return new ViewModel(array('rowset' => $this->getUsersTable()->select(), 'message' => $delete_msg));
        } else {
            return new ViewModel(array('rowset' => $this->getUsersTable()->select()));
        }
    }

    // C - Create
    public function createAction() {
        $form = new UserForm();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $form->setInputFilter(new UserFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $data = $form->getData();
                $cryptKey = 'qJB0rGtIn5UB1xG03efyCp';
                $q = $data['usr_password'];
                $data['usr_password'] = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), $q, MCRYPT_MODE_CBC, md5(md5($cryptKey))));
                unset($data['submit']);
                if (empty($data['usr_registration_date']))
                    $data['usr_registration_date'] = '2013-07-19 12:00:00';
//                print_r($data);exit;
                $this->getUsersTable()->insert($data);
                $last_user_id = $this->getUsersTable()->lastInsertValue; // last inserted id
                if ($data['roles_id'] == 2) {
                    if ($last_user_id > 0) {
                        $userRight = new UserRight();
                        $userRight->user_id = $last_user_id;
                        $userRight->crud_user = 0;
                        $userRight->crud_client = 0;
                        $userRight->crud_lead = 0;
                        $userRight->crud_link = 0;
                        $userRight->crud_traffic = 0;
                        $userRight->crud_transcript = 0;
                        $userRight->crud_book = 0;
                        $tableGateway = $this->getConnection();
                        $userRightTable = new UserRightTable($tableGateway);
                        $userRightTable->saveUserRight($userRight);
                    }
                }
                $session = new Container('link');
                $session->offsetSet('delete_user_msg', "User has been Created");
                return $this->redirect()->toRoute('auth/default', array('controller' => 'admin', 'action' => 'index'));
            }
        }
        return new ViewModel(array('form' => $form));
    }

    // U - Update
    public function updateAction() {
        $id = $this->params()->fromRoute('id');
        if (!$id)
            return $this->redirect()->toRoute('auth/default', array('controller' => 'admin', 'action' => 'index'));
        $form = new UserForm();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $form->setInputFilter(new UserFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $data = $form->getData();
                $cryptKey = 'qJB0rGtIn5UB1xG03efyCp';
                $q = $data['usr_password'];
                $data['usr_password'] = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), $q, MCRYPT_MODE_CBC, md5(md5($cryptKey))));
                unset($data['submit']);
                if (empty($data['usr_registration_date']))
                    $data['usr_registration_date'] = '2013-07-19 12:00:00';
                $this->getUsersTable()->update($data, array('usr_id' => $id));
                $session = new Container('link');
                $session->offsetSet('delete_user_msg', "User has been Updated");
                return $this->redirect()->toRoute('auth/default', array('controller' => 'admin', 'action' => 'index'));
            }
        }
        else {
            $current_data = $this->getUsersTable()->select(array('usr_id' => $id))->current();
            $cryptKey = 'qJB0rGtIn5UB1xG03efyCp';
            $q = $current_data['usr_password'];
            $current_data['usr_password'] = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($cryptKey), base64_decode($q), MCRYPT_MODE_CBC, md5(md5($cryptKey))), "\0");
            $form->setData($current_data);
        }

        return new ViewModel(array('form' => $form, 'id' => $id));
    }

    // D - delete
    public function deleteAction() {
        header('Content-Type: application/json');
        $id = $this->params()->fromRoute('id');

        if ($id) {
            $this->getUsersTable()->delete(array('usr_id' => $id));
        }
        echo json_encode(array('text' => ''));
        exit();
//		return $this->redirect()->toRoute('auth/default', array('controller' => 'admin', 'action' => 'index'));											
    }

    public function getUsersTable() {
        // I have a Table data Gateway ready to go right out of the box
        if (!$this->usersTable) {
            $this->usersTable = new TableGateway(
                    'users', $this->getServiceLocator()->get('Zend\Db\Adapter\Adapter')
//				new \Zend\Db\TableGateway\Feature\RowGatewayFeature('usr_id') // Zend\Db\RowGateway\RowGateway Object
//				ResultSetPrototype
            );
        }
        return $this->usersTable;
    }

    public function setmessageAction() {

        $session = new Container('link');
        $session->offsetSet('delete_user_msg', "User has been Deleted");

        return $this->redirect()->toRoute('auth/default', array('controller' => 'admin', 'action' => 'index'));
    }

    public function getConnection() {
        $sm = $this->getServiceLocator();
        $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
        $resultSetPrototype = new \Zend\Db\ResultSet\ResultSet();
        $resultSetPrototype->setArrayObjectPrototype(new
                \Clients\Model\UserRight);
        $tableGateway = new \Zend\Db\TableGateway\TableGateway('user_rights', $dbAdapter, null, $resultSetPrototype);
        return $tableGateway;
    }

}
