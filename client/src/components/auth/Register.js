import React, { useState } from "react";
import {
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Jumbotron,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { Redirect } from "react-router-dom";

import "../../stylesheets/Register.css";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    town: "",
    street: "",
    streetNumber: "",
    postCode: "",
    phoneNumber: "",
    password: "",
    password2: "",
    billingNumber: "",
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
    password2,
    billingNumber,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Hasła nie zgadzają się!", "danger");
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
        billingNumber,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div id='register_background'>
      <Jumbotron className='registerJumbotron' fluid>
        <Container fluid>
          <Row>
            <Col sm='2'></Col>
            <Col xs='auto'>
              <h3>Dołącz do FotoRental</h3>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <div className='login_form'>
        <Alert />
        <Form onSubmit={(e) => onSubmit(e)}>
          <div className='login_form_items'>
            <Row>
              <Col className='column' md='6'>
                <FormGroup>
                  <Label for='firstName'>*Imię:</Label>
                  <Input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Imię'
                    value={firstName}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col className='column' md='6'>
                <FormGroup>
                  <Label for='lastName'>*Nazwisko:</Label>
                  <Input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Nazwisko'
                    value={lastName}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='column' sm='12'>
                <FormGroup>
                  <Label for='email'>*Adres Email:</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => onChange(e)}
                  /><p>
                    <small>
                      Na ten adres będziesz otrzymywał wszystkie powiadomienia.
                  </small></p>
                </FormGroup>
                <FormGroup>
                  <Label for='password'>*Hasło:</Label>
                  <Input
                    className=''
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Hasło'
                    value={password}
                    onChange={(e) => onChange(e)}
                  /><p>
                    <small>
                      Użyj przynajmniej 6 znaków.
                  </small>
                  </p>
                  <Label for='password2'>*Potwierdź hasło:</Label>
                  <Input
                    className=''
                    type='password'
                    name='password2'
                    id='password2'
                    placeholder='Potwierdź hasło'
                    value={password2}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='7' className='column'>
                <FormGroup>
                  <Label for='town'>*Miejscowość:</Label>
                  <Input
                    type='text'
                    name='town'
                    id='town'
                    placeholder='Miejscowość'
                    value={town}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col md='5' className='column'>
                <FormGroup>
                  <Label for='postCode'>*Kod pocztowy:</Label>
                  <Input
                    type='text'
                    name='postCode'
                    id='postCode'
                    placeholder='xx-xxx'
                    value={postCode}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md='7' className='column'>
                <FormGroup>
                  <Label for='street'>*Ulica:</Label>
                  <Input
                    type='text'
                    name='street'
                    id='street'
                    placeholder='Ulica'
                    value={street}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col md='5' className='column'>
                <FormGroup>
                  <Label for='streetNumber'>*Nr domu/Nr lokalu:</Label>
                  <Input
                    type='text'
                    name='streetNumber'
                    id='streetNumber'
                    placeholder='Nr domu/Nr lokalu'
                    value={streetNumber}
                    onChange={(e) => onChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='column' sm='12'>
                <FormGroup>
                  <Label for='phoneNumber'>*Nr telefonu:</Label>
                  <Input
                    type='tel'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='+48 xxx-xxx-xxx'
                    value={phoneNumber}
                    onChange={(e) => onChange(e)}
                  />
                  <p>
                    <small>
                      Nie udostępnimy Twojego adresu ani numeru nikomu, bez Twojej
                      zgody.
                  </small></p>
                </FormGroup>
                <FormGroup>
                  <Label for='billingNumber'>*Numer rachunku:</Label>
                  <Input
                    type='text'
                    name='billingNumber'
                    id='billingNumber'
                    placeholder='xx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'
                    value={billingNumber}
                    onChange={(e) => onChange(e)}
                  />
                  <p>
                    <small>
                      Wymagany do przeprowadzenia transakcji od innych użytkoników
                      podczas wynajmowania Twoich ofert.
                </small></p>
                </FormGroup>
                <div className='smalltext'>
                  <small>*wymagane</small>
                </div>
                <Label for='submit_button'>
                  <small>
                    Klikając przycisk zarejestruj się, akceptuję{" "}
                    <a className='link' href='/regulamin'>
                      Regulamin
                    </a>
                  </small>
                </Label>
                <Button className='submit_button' type='submit'>
                  Zarejestruj się
                </Button>
                <div>
                  Masz już konto?{" "}
                  <a className='link' href='/login'>
                    Zaloguj się
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
