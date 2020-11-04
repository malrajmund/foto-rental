import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { FormGroup, Input, Label, Button, Form, Jumbotron, Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import Alert from '../layout/Alert';

import '../../stylesheets/Register.css'

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        town: '', 
        street: '',
        streetNumber: '', 
        postCode: '',
        phoneNumber: '',
        password: '',
        password2: ''
    });

    const { 
        firstName, 
        lastName, 
        email, 
        town, 
        street, 
        streetNumber, 
        postCode, 
        phoneNumber, 
        password, 
        password2 
    } = formData; 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Hasła nie zgadzają się!', 'danger');
        } else {
            register({ 
                firstName, 
                lastName, 
                email, 
                town, 
                street, 
                streetNumber, 
                postCode, 
                phoneNumber, 
                password,  
            })
        }
    }


    return (
    <Fragment>
      
            <Jumbotron className="registerJumbotron" fluid>
                <Container fluid>
                    <Row>
                        <Col sm="2"></Col>
                        <Col xs="auto">
                            <h3>Dołącz do FotoRental</h3>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            
            <div className='login_form'>
            <Alert/>
                <Form onSubmit = {e => onSubmit(e)}>
                    <div className='login_form_items'>
                        <Row>
                            <Col className='column' md='6'>
                                <FormGroup>
                                    <Label for="firstName">*Imię:</Label>
                                    <Input type='text' name="firstName" id="firstName" placeholder="Imię" value = {firstName}
           onChange = { e => onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col className='column' md='6'>
                                <FormGroup>
                                    <Label for="lastName">*Nazwisko:</Label>
                                    <Input type='text' name="lastName" id="lastName" placeholder="Nazwisko" value = {lastName}
           onChange = { e => onChange(e)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='column' sm='12'>
                                <FormGroup>
                                    <Label for="email">*Adres Email:</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" value = {email}
           onChange = { e => onChange(e)}/>
                                    <small>Na ten adres będziesz otrzymywał wszystkie powiadomienia.</small>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">*Hasło:</Label>
                                    <Input className='' type="password" name="password" id="password" placeholder="Hasło" value = {password}
           onChange = { e => onChange(e)}/>
                                    <small>Użyj 8 znaków, w tym: 1 wielkiej litery, 1 małej litery, 1 cyfry.</small>
                                    <Label for="password2">*Potwierdź hasło:</Label>
                                    <Input className='' type="password" name="password2" id="password2" placeholder="Potwierdź hasło" value = {password2}
           onChange = { e => onChange(e)}/>
                                    
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='7' className='column'>
                                <FormGroup>
                                    <Label for='town'>*Miejscowość:</Label>
                                    <Input type='text' name='town' id='town' placeholder='Miejscowość' value = {town}
           onChange = { e => onChange(e)}/>
                                </FormGroup>
                            </Col>
                            <Col md='5' className='column'>
                                <FormGroup>
                                    <Label for='postCode'>*Kod pocztowy:</Label>
                                    <Input type='text' name='postCode' id='postCode' placeholder='xx-xxx' value = {postCode}
           onChange = { e => onChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='7' className='column'>
                                <FormGroup>
                                    <Label for='street'>*Ulica:</Label>
                                    <Input type='text' name='street' id='street' placeholder='Ulica' value = {street}
           onChange = { e => onChange(e)}/>
                                </FormGroup>
                            </Col>
                            <Col md='5' className='column'>
                                <FormGroup>
                                    <Label for='streetNumber'>*Nr domu/Nr lokalu:</Label>
                                    <Input type='text' name='streetNumber' id='streetNumber' placeholder='Nr domu/Nr lokalu' value = {streetNumber}
           onChange = { e => onChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='column' sm='12'>
                                <FormGroup>
                                    <Label for='phoneNumber'>*Nr telefonu:</Label>
                                    <Input type='tel' name='phoneNumber' id='phoneNumber' placeholder='' value = {phoneNumber}
           onChange = { e => onChange(e)}/>
                                    <small>Nie udostępnimy Twojego adresu ani numeru nikomu, bez Twojej zgody.</small>
                                </FormGroup>
                                <div className='smalltext'>
                                    <small>*wymagane</small>
                                </div>
                                <Label for='submit_button'>
                                    <small>Klikając przycisk zarejestruj się, akceptuję <a className='link' href='/regulamin'>Regulamin</a></small>
                                </Label>
                                <Button className='submit_button' type="submit" >Zarejestruj się</Button>
                                <div>
                                    Masz już konto? <a className='link' href='/login'>Zaloguj się</a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        
    </Fragment>
  
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(
    null,
     { setAlert, register }
)(Register);
