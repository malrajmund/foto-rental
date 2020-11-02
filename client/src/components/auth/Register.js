import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        province: '',
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
        province, 
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
            console.log('Passwords doesnt match');
        } else {
           console.log('Success');
        }
    }


    return (
    <Fragment>
      <h1 className="large text-primary">Zarejestruj sie</h1>
      <p className="lead"><i className="fas fa-user"></i> Stwórz konto</p>
      <form className="form" onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <input
           type="text" 
           placeholder="Imie" 
           name="firstName" 
           value = {firstName}
           onChange = { e => onChange(e)}
           required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Nazwisko" name="lastName" value = {lastName}
           onChange = { e => onChange(e)}
           required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" name="email" value = {email}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="province" placeholder="Województwo" name="province" value = {province}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="town" placeholder="Miasto" name="town" value = {town}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="street" placeholder="Ulica" name="street" value = {street}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="streetNumber" placeholder="Numer domu" name="streetNumber" value = {streetNumber}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="postCode" placeholder="Kod pocztowy" name="postCode" value = {postCode}
           onChange = { e => onChange(e)}
           required/>
        </div>
        <div className="form-group">
          <input type="phoneNumber" placeholder="Numer telefonu" name="phoneNumber" value = {phoneNumber}
           onChange = { e => onChange(e)}
           required/>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value = {password}
            onChange = { e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value = {password2}
            onChange = { e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Masz konto? <Link to="/login">Zaloguj się</Link>
      </p>
    </Fragment>
    )
}

export default Register
