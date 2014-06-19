<?php
namespace Auth\Form;

use Zend\Form\Form;

class AuthForm extends Form
{
    public function __construct($name = null)
    {
        parent::__construct('auth');
        $this->setAttribute('method', 'post');

        $this->add(array(
            'name' => 'usr_name',
            'attributes' => array(
                'type'  => 'text',
                'class' =>  'form-control',
            ),
            'options' => array(
               
            ),
        ));
        $this->add(array(
            'name' => 'usr_password',
            'attributes' => array(
                'type'  => 'password',
                'class' =>  'form-control',
            ),
            'options' => array(
               
            ),
        ));
        $this->add(array(
            'name' => 'rememberme',
            'type'  => 'checkbox',
            'attributes' => array(
                
                'class' =>  'ace',
            ),
//			'type' => 'checkbox', // 'Zend\Form\Element\Checkbox',		
//                        'class' => 'ace',	
//            'attributes' => array( // Is not working this way
//                'type'  => '\Zend\Form\Element\Checkbox',
//            ),
            'options' => array(
            //    'label' => 'Remember Me?',
//				'checked_value' => 'true', without value here will be 1
//				'unchecked_value' => 'false', // witll be 1
            ),
        ));			
        $this->add(array(
            'name' => 'submit',
            'attributes' => array(
                'type'  => 'submit',
                'value' => 'Go',
                'id' => 'submitbutton',
                'class' => 'width-35 pull-right btn btn-sm btn-primary',
            ),
        )); 
    }
}