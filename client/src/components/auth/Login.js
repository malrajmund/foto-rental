import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../layout/Alert";
import { Redirect } from "react-router-dom";
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
import "../../stylesheets/Login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div>
        <Jumbotron className='jumbo' fluid>
          <Container fluid>
            <Row>
              <Col sm='2'></Col>
              <Col xs='auto'>
                <h3>Zaloguj się do FotoRental</h3>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Alert />
        <div className='login_form'>
          <Form onSubmit={(e) => onSubmit(e)}>
            <div className='login_form_items'>
              <FormGroup>
                <Label for='email'>Adres Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Hasło</Label>
                <Input
                  className=''
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Hasło'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </FormGroup>
              <Button className='submit_button' type='submit'>
                Zaloguj
              </Button>
              <div className='text'>
                Nie masz konta?{" "}
                <a className='link' href='/register'>
                  Dołącz do nas!
                </a>
              </div>
              <div className='text'>
                <a className='link' href='/remind'>
                  Przypomnij hasło
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
