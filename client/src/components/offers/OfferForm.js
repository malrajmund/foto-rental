import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import "../../stylesheets/NewOffer.css";
import { connect } from "react-redux";
import { addOffer } from "../../actions/offer";
import { setAlert } from "../../actions/alert";
import Alert from "../layout/Alert";
import { getCategories } from '../../actions/category';
import { useHistory } from "react-router-dom";

const OfferForm = ({ addOffer, getCategories, category: { categories } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  let history = useHistory();
  const [formData, setFormData] = useState({
    text: "",
    offerName: "",
    pricePerDay: "",
    pricePerWeek: "",
    annulPriceTo: "",
    annulPriceAbove: "",
    category: null,
  });
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const {
    text,
    offerName,
    pricePerDay,
    pricePerWeek,
    annulPriceTo,
    annulPriceAbove,
    category,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);
    formData.append("category", category);
    formData.append("pricePerDay", pricePerDay);
    formData.append("offerName", offerName);
    formData.append("pricePerWeek", pricePerWeek);
    formData.append("annulPriceTo", annulPriceTo);
    formData.append("annulPriceAbove", annulPriceAbove);
    addOffer(formData);
    // history.push('/dashboard');
  };

  return (
    <div id='offerform_background'>
      <div className='new_offer_form'>
        <Jumbotron className='jumbo_offer bg-transparent'>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Container fluid>
              <h1 className='display-4'>Wystaw przedmiot</h1>
              <FormGroup>
                <Label for='item_title'>*Tytuł oferty</Label>
                <Input
                  type='text'
                  name='offerName'
                  id='offerName'
                  minLength='30'
                  maxLength='55'
                  placeholder='Tytuł oferty'
                  value={offerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for='item_desc'>*Opis</Label>
                <Input
                  type='textarea'
                  name='text'
                  id='text'
                  minLength='100'
                  maxLength='1000'
                  placeholder='Opisz swoją ofertę'
                  value={text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for='category'>*Kategoria</Label>
                <Input
                  type='select'
                  name='category'
                  id='category'
                  value={category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value={null} selected disabled>
                    --- Wybierz Kategorię ---
                  </option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <Row>
                <Col md='6'>
                  <FormGroup>
                    <Label for='day_price'>Cena za dzień najmu</Label>
                    <Input
                      type='number'
                      name='pricePerDay'
                      placeholder='Podaj cenę w PLN'
                      value={pricePerDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md='6'>
                  <FormGroup>
                    <Label for='week_price'>Cena za tydzień najmu</Label>
                    <Input
                      type='number'
                      name='pricePerWeek'
                      placeholder='Podaj cenę w PLN'
                      value={pricePerWeek}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <FormGroup>
                    <Label for='cancel_fee1'>
                      Koszt odwołania do 3 dni przed rozpoczęciem
                    </Label>
                    <Input
                      type='number'
                      max='100'
                      min='0'
                      name='annulPriceTo'
                      placeholder='Podaj % łącznego kosztu rezerwacji'
                      value={annulPriceTo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md='6'>
                  <FormGroup>
                    <Label for='cancel_fee2'>
                      Koszt odwołania później niż 3 dni przed rozpoczęciem
                    </Label>
                    <Input
                      type='number'
                      max='100'
                      min='0'
                      name='annulPriceAbove'
                      placeholder='Podaj % łącznego kosztu rezerwacji'
                      value={annulPriceAbove}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <FormGroup>
                  <Col md='12'>
                    <p className='lead'>
                      Wybierz zdjęcia przedmiotu, który chcesz wystawić.
                    </p>
                    <hr className='my-2' />
                    <p>
                      Możesz dodać maksymalnie 10 zdjęć w formacie JPG do 2MB.
                    </p>
                    <Fragment>
                      <input
                        type='file'
                        name='file'
                        id='customFile'
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                        }}
                      />
                    </Fragment>
                    <hr className='my-2' />
                  </Col>
                </FormGroup>
              </Row>
              {/* <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> Bezpłatne odwołanie do 24h od
                  dokonania rezerwacji
                </Label>
              </FormGroup> */}
              <Alert />
              <FormGroup className='submit_form'>
                <Label for='submit_button'>
                  <small>
                    Klikając przycisk Dodaj ofertę, akceptuję{" "}
                    <a className='link' href='/regulamin'>
                      Regulamin
                    </a>
                  </small>
                </Label>
                <Button
                  name='submit_button'
                  id='submit_button'
                  className='submit_button'
                  type='submit'
                >
                  Dodaj ofertę
                </Button>
              </FormGroup>
            </Container>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
};

OfferForm.propTypes = {
  addOffer: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category
})

export default connect(mapStateToProps, { setAlert, addOffer, getCategories })(OfferForm);
