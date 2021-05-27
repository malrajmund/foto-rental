import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOffer } from "../../actions/offer";
import {
  FormGroup,
  Button,
  Form,
  Spinner,
  Label,
  Input,
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  Jumbotron,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { setAlert } from "../../actions/alert";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Alert from "../layout/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../stylesheets/OfferReservationForm.css";
import { useHistory } from "react-router-dom";
import { addChat } from "../../actions/chat";
import { getCategories } from "../../actions/category";

const OfferReservationForm = ({
  getOffer,
  getCategories,
  category: { categories },
  addChat,
  offer: {
    offers,
    loading,
  },
  auth: { isAuthenticated, user },
  match,
}) => {
  let history = useHistory();
  //do collapsa
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  useEffect(() => {
    getOffer(match.params.id);
  }, [getOffer]);
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    getFirstReservatedDate(start, offers);
    setStartDate(start);
    setEndDate(end);
  };
  var branch = [];
  const findParent = id => {
    categories.map((category) => {
      if (category._id === id) {
        branch.push(category);
        if (category.parent) {
          findParent(category.parent);
        }
      }
    })
  }
  if (!loading) {
    categories.map((category) => {
      if (category._id === offers.category) {
        branch.push(category);
        if (category.parent) {
          findParent(category.parent);
        }
      }
    })
  }
  //pytanie do właściciela
  const [modal, setModal] = useState(false);
  const launch = () => setModal(!modal);
  const [question, setQuestion] = useState("");
  const sendQuestion = (e) => {
    if (!isAuthenticated) {
      history.push('/login');
    }
    else {
      e.preventDefault();
      addChat(user, user.firstName + " " + user.lastName, offers.user, offers.name, `Pytanie o przedmiot: ${offers.offerName}`, question);
      window.location.reload();
    }
  }




  //do koszyka
  const onSubmit = (e) => {
    e.preventDefault();
    var cart;
    if (!window.localStorage.getItem("cart")) {
      cart = [];
    } else {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }
    if (endDate == null) {
      setEndDate(startDate);
    }
    const cartItem = {
      user: offers.user,
      name: offers.name,
      id: offers._id,
      offerName: offers.offerName,
      message: message,
      startDate: startDate,
      endDate: endDate,
      price: price,
      file: offers.file.data,
    };
    cart.push(JSON.stringify(cartItem));
    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
    setAlert("Dodano do koszyka!", "danger");
  };

  function TotalPrice(offers, endDate, startDate) {
    if (endDate === null || startDate === null) {
      return 0;
    }
    return (
      offers.pricePerDay * (1 +
        ((endDate.valueOf() - startDate.valueOf()) / 86400000))
    );
  }

  function getReservatedDates(offers) {
    const unixDatesArray = [];
    var oneDay = 86400000;
    for (const dates in offers.reservation) {
      if (offers.reservation[dates].status !== "odwołana") {
        const reservationDateInFromDb = new Date(
          offers.reservation[dates].date_in
        ).valueOf();
        const reservationDateOutFromDb = new Date(
          offers.reservation[dates].date_out
        ).valueOf();
        unixDatesArray.push(reservationDateInFromDb);
        unixDatesArray.push(reservationDateOutFromDb);
        while (reservationDateInFromDb + oneDay < reservationDateOutFromDb) {
          unixDatesArray.push(reservationDateInFromDb + oneDay);
          oneDay = oneDay + 86400000;
        }
        oneDay = 86400000;
      }
    }
    return unixDatesArray;
  }

  function getFirstReservatedDate(startDate, offers) {
    if (startDate === null) {
      return null;
    }
    for (const dates in offers.reservation) {
      if (
        startDate.valueOf() <
        new Date(offers.reservation[dates].date_in).valueOf()
      ) {
        return new Date(offers.reservation[dates].date_in).valueOf();
      }
    }
    return null;
  }

  var price = 0;

  return loading ? (
    <Spinner className='load_spinner' color='primary' />
  ) : (
      <div id='page_container'>
        <div id='offer_container'>
          {offers?.user === user?._id ? (
            <Jumbotron className="registerJumbotron" fluid>
              <h3>Tak widzą Twoją ofertę inni użytkownicy</h3>
            </Jumbotron>) : (<></>)}
          {offers.status === "Archiwalna" ? (
            <Jumbotron className="registerJumbotron" fluid>
              <h3>Oferta archiwalna</h3>
            </Jumbotron>) : (<></>)}
          <div className='cat_breadcrumb'>
            <a className='cat_link' href='/'>
              FotoRental
          </a>
            {branch.slice(0).reverse().map((item) => (<>/
              <a className='cat_link' href='/'>
                {item.name.split('\xa0').join('')}
              </a></>
            ))}
          </div>
          <h4 className='offer_title'>{offers.offerName}</h4>
          <Container fluid>
            <Row>
              <Col className='no_padding_col main_section' md='12' lg='7'>
                <ImageGallery
                  items={[
                    {
                      original: "data:image/jpeg;base64," + offers?.file?.data,
                      thumbnail: "data:image/jpeg;base64," + offers?.file?.data,
                    },
                    {
                      original: "data:image/jpeg;base64," + offers?.file?.data,
                      thumbnail: "data:image/jpeg;base64," + offers?.file?.data,
                    },
                    {
                      original: "data:image/jpeg;base64," + offers?.file?.data,
                      thumbnail: "data:image/jpeg;base64," + offers?.file?.data,
                    },
                    {
                      original: "data:image/jpeg;base64," + offers?.file?.data,
                      thumbnail: "data:image/jpeg;base64," + offers?.file?.data,
                    },
                  ]}
                  showPlayButton={false}
                />
                <h3 className='section_title'>Szczegóły</h3>
                <p className='section_desc'>{offers.text}</p>
                <h3 className='section_title'>Rezygnacja</h3>
                <p className='section_desc'>
                  Koszt odwołania rezerwacji do 3 dni przed rozpoczęciem wynosi{" "}
                  {offers.annulPriceTo}% łącznego kosztu wypożyczenia. Odwołanie
                nadal jest możliwe po przekroczeniu tej daty jednak koszt jest
                zwiększony do {offers.annulPriceAbove}%. Właściciel również ma prawo
                odwołać rezerwację.
              </p>
              </Col>
              <Col md='0' lg='1'></Col>
              <Col className='no_padding_col' md='8' lg='4'>
                <div id='user_info'>
                  <CardDeck>
                    <Card sm='6' className='no_border no_padding_col'>
                      <i className='material-icons big'>person</i>
                    </Card>
                    <Card sm='6' className='no_border no_padding_col'>
                      <p className='small_margin'>{offers.name}</p>
                      <p className='small_margin span_grade'>
                        <i className='material-icons orange size24'>grade</i>
                        <b>4.5</b>
                      </p>

                      {offers?.user === user?._id ? (
                        <Button disabled color='danger' className='small_margin icon_button' onClick={launch}>
                          <div>
                            Napisz
                      <i className='material-icons'>chat</i>
                          </div>
                        </Button>
                      ) : (
                          <Button color='danger' className='small_margin icon_button' onClick={launch}>
                            <div>
                              Napisz
                      <i className='material-icons'>chat</i>
                            </div>
                          </Button>
                        )}
                      <Modal isOpen={modal} toggle={launch}>
                        <Form onSubmit={(e) => sendQuestion(e)}>
                          <ModalHeader toggle={launch}>Wiadomość do {offers.name}</ModalHeader>
                          <ModalBody>
                            <FormGroup>
                              <Label for='question'>Pytanie o przedmiot: {offers.offerName}</Label>
                              <Input
                                type='textarea'
                                name='question'
                                id='question'
                                placeholder='Wiadomość...'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                              />
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" type='submit' >Wyślij</Button>{' '}
                            <Button color="secondary" onClick={launch}>Anuluj</Button>
                          </ModalFooter>
                        </Form>
                      </Modal>
                      <p className='small_margin'>Lublin, Lubelskie</p>
                    </Card>
                  </CardDeck>
                  <CardDeck>
                    <Card sm='6' className='no_border no_padding_col'>
                      <div id='item_day_price'>
                        <h4>{offers.pricePerDay} zł</h4>
                        <p>/dzień</p>
                      </div>
                    </Card>
                    <Card sm='6' className='no_border no_padding_col'>
                      <div id='item_week_price'>
                        <h4>{offers.pricePerWeek} zł</h4>
                        <p>/tydzień</p>
                      </div>
                    </Card>
                  </CardDeck>
                  <p id='user_info_desc'>
                    Wypożyczając ten przedmiot odbierzesz go dzień przed umówioną
                    datą wynajmu, a zwrotu dokonasz najpóźniej dzień po
                    zakończeniu. Dni wypożyczenia i zwrotu są darmowe.
                </p>
                  <Button id='collapse_button' className='icon_button' color='primary' onClick={toggle}>
                    <div>
                      Sprawdź dostępność
                  <i className='material-icons'>date_range</i>
                    </div>
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Form onSubmit={(e) => onSubmit(e)}>
                      <FormGroup id='callendar'>
                        <DatePicker
                          selected={null}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          excludeDates={getReservatedDates(offers)}
                          minDate={new Date()}
                          maxDate={getFirstReservatedDate(startDate, offers)}
                          selectsRange
                          inline
                        />
                        <h5>
                          Łączny koszt najmu:{" "}
                          {(price = TotalPrice(offers, endDate, startDate))} zł
                      </h5>
                      </FormGroup>
                      <FormGroup>
                        <Label for='item_desc'>Wiadomość do najemcy</Label>
                        <Input
                          type='textarea'
                          name='message'
                          id='message'
                          placeholder='Wiadomość...'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </FormGroup>

                      {offers?.user === user?._id || endDate === null || offers.status === "Archiwalna" ? (
                        <Button
                          className='submit_button' disabled>Dodaj do koszyka</Button>
                      ) : (
                          <Button
                            name='submit_button'
                            id='submit_button'
                            className='submit_button'
                            type='submit'>Dodaj do koszyka</Button>
                        )}
                    </Form>
                    <Alert />
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div >
    );
};

OfferReservationForm.propTypes = {
  getCategories: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired,
  getOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  auth: state.auth,
  category: state.category,
});

export default connect(mapStateToProps, { getOffer, addChat, getCategories })(
  OfferReservationForm
);
