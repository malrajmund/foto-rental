import React, { useState } from 'react';
import { FormGroup, Input, Label, Button, Form, Jumbotron, Container, Row, Col, Alert } from 'reactstrap'
import add_photo_img from "../../img/icons/baseline_add_photo_alternate_black_18dp.png"
import remove_photo_img from "../../img/icons/baseline_image_not_supported_black_18dp.png"
import item_img from "../../img/img/rokinon_set.png"
import '../../stylesheets/NewOffer.css'
import { connect } from 'react-redux';
import { addOffer } from '../../actions/offer'
import PropTypes from 'prop-types'

const OfferForm = ({ addOffer }) => {
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
    
    return (
        <div>
            <div className='new_offer_form'>
                <Jumbotron className='jumbo_offer' fluid>
                    <Container fluid>
                        <h1 className='display-4'>Wystaw przedmiot</h1>
                        <p className="lead">Wybierz zdjęcia przedmiotu, który chcesz wystawić.</p>
                        <hr className='my-2' />
                        <p>Możesz dodać maksymalnie 10 zdjęć w formacie JPG do 2MB.</p>
                        <Button className='item_temp' color='light'>
                            <input name='file' type="file"/>
                        </Button>

                        <hr className='my-2' />
                        <Form>
                            <FormGroup>
                                <Label for='item_title'>*Tytuł oferty</Label>
                                <Input type='text' name='item_title' id='item_title' placeholder="Tytuł oferty" />
                            </FormGroup>
                            <FormGroup>
                                <Label for='item_desc'>*Opis</Label>
                                <Input type='textarea' name='item_desc' id='item_desc' placeholder="Opisz swoją ofertę" />
                            </FormGroup>
                            <FormGroup>
                                <Label for='item_category'>*Kategoria</Label>
                                <Input type='select' name='item_category' id='item_category'>
                                    <option selected disabled>--- Wybierz Kategorię ---</option>
                                    <optgroup label='Aparaty cyfrowe'>
                                        <option>Bezlusterkowce</option>
                                        <option>Lustrzanki</option>
                                    </optgroup>
                                    <optgroup label="Kamery kinowe">
                                        <option>Zestawy</option>
                                        <option>Samo body</option>
                                    </optgroup>
                                    <optgroup label='Obiektywy'>
                                        <option>Stałoogniskowe</option>
                                        <option>Zmiennoogniskowe</option>
                                        <option>Zestawy</option>
                                    </optgroup>
                                    <optgroup label='Statywy, monopody, itp.'>
                                        <option>Statywy</option>
                                        <option>Monopody</option>
                                        <option>Gimbale</option>
                                        <option>Stabilizatory</option>
                                    </optgroup>
                                    <optgroup label='Nośniki danych'>
                                        <option>Karty pamięci</option>
                                        <option>Dyski</option>
                                    </optgroup>
                                </Input>
                            </FormGroup>
                            <Row>
                                <Col md='6'>
                                    <FormGroup>
                                        <Label for='day_price'>Cena za dzień najmu</Label>
                                        <Input type='number' name='day_price' id='day_price' placeholder='Podaj cenę w PLN' />
                                    </FormGroup>
                                </Col>
                                <Col md='6'>
                                    <FormGroup>
                                        <Label for='week_price'>Cena za tydzień najmu</Label>
                                        <Input type='number' name='week_price' id='week_price' placeholder='Podaj cenę w PLN' />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='6'>
                                    <FormGroup>
                                        <Label for='cancel_fee1'>Koszt odwołania do 3 dni przed rozpoczęciem</Label>
                                        <Input type='number' name='day_price' id='day_price' placeholder='Podaj cenę w PLN' />
                                    </FormGroup>
                                </Col>
                                <Col md='6'>
                                    <FormGroup>
                                        <Label for='cancel_fee2'>Koszt odwołania później niż 3 dni przed rozpoczęciem</Label>
                                        <Input type='number' name='week_price' id='week_price' placeholder='Podaj cenę w PLN' />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' />{' '}
                                    Bezpłatne odwołanie do 24h od dokonania rezerwacji
                                </Label>
                            </FormGroup>
                            <FormGroup className='submit_form'>
                                <Label for='submit_button'>
                                    <small>Klikając przycisk Dodaj ofertę, akceptuję <a className='link' href='/regulamin'>Regulamin</a></small>
                                </Label>
                                <Button name='submit_button' id='submit_button' className='submit_button' type="submit">Dodaj ofertę</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </Jumbotron>
            </div>
        </div>
    );
}

OfferForm.propTypes = {
    addOffer: PropTypes.func.isRequired,

}


export default connect(null, {addOffer})(OfferForm);