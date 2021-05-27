import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonToggle,
  Container,
} from "reactstrap";
import expand_icon from "../../img/icons/baseline_expand_more_black_18dp.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

const DashboardReservationListItem = ({
  offer: {
    id,
    res_id,
    offerName,
    text,
    name,
    status,
    file,
    date,
    date_in,
    date_out,
    message,
    cost,
  },
  auth: { id: user_id }
}) => {
  const [activeHeight, setActiveHeight] = useState(0);
  const setHeight = height => {
    if (activeHeight !== height) setActiveHeight(height);
  }
  useLayoutEffect(() => {
    setTimeout(() => setHeight(document.getElementById("my_item_card_img")?.getBoundingClientRect().width), 100);
  })
  useEffect(() => {
    function handleResize() {
      setHeight(document.getElementById("my_item_card_img")?.getBoundingClientRect().width);
    }
    window.addEventListener('resize', handleResize);
  })

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const launch = () => setModal(!modal);
  const toggle = () => setIsOpen(!isOpen);

  const makePayment = async (token) => {
    const body = {
      token,
      id,
      res_id,
      offerName,
      text,
      name,
      status,
      file,
      date,
      date_in,
      date_out,
      message,
      cost,
      user_id,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`http://localhost:5000/api/offers/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      console.log("RESPONSE", response);
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg='10' id='item_card_col'>
            <a className='item_link' href={`/offers/${id}`}>
              <Card className='my_item_card'>
                <Row className='no-gutters'>
                  <Col sm='6' md='4' lg='3' xl='2'>
                    <CardImg
                      id='my_item_card_img'
                      className='img_square'
                      style={{ height: activeHeight }}
                      top
                      src={"data:image/jpeg;base64," + file}
                      alt={file.name}
                      alt='Card image cap'
                    />
                  </Col>
                  <Col sm='6' md='8' lg='9' xl='10'>
                    <CardBody>
                      <CardTitle tag='h5'>{offerName}</CardTitle>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>
                        {name}
                      </CardSubtitle>
                      <CardText>
                        <Row>
                          <Col lg='7'>
                            <p className='card_text_info'>
                              zawarto: <b>{date?.slice(0, -14)}</b>
                            </p>
                            <p className='card_text_info'>
                              okres rezerwacji:{" "}
                              <b>
                                {date_in?.slice(0, -14)} - {date_out?.slice(0, -14)}
                              </b>
                            </p>
                          </Col>
                          <Col lg='5'>
                            <p className='card_text_info'>
                              status: <b>{status}</b>
                            </p>
                            <p className='card_text_info'>
                              łączny koszt: <b>{cost}zł</b>
                            </p>
                          </Col>
                        </Row>
                      </CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </a>
          </Col>
          <Col lg='2' id='item_buttons_col'>
            <StripeCheckout
              stripeKey='pk_test_51Hyg1XABJcwzXikHb38NUjJE4L5OxekCKwN7Yhdn6Wod7o4GOFy7UKJm4snw7vN9NGU7FgU8euHyigjr8enJxZuR005L3zFVAb'
              token={makePayment}
              name='Opłać oferte'
              amount={cost * 100}
              currency='PLN'
              panelLabel='ZAPŁAĆ'
            //shippingAddress
            >
              {status === "nadchodząca" ? (
                <ButtonToggle className='card_pay_button' color='warning'>
                  <div>
                    Opłać
                  <i className='material-icons'>account_balance_wallet</i>
                  </div>
                </ButtonToggle>
              ) : (
                  <ButtonToggle
                    className='card_pay_button'
                    color='success'
                    disabled
                  >
                    <div>
                      Opłacono
                  <i className='material-icons'>done</i>
                    </div>
                  </ButtonToggle>
                )}
            </StripeCheckout>
            <Dropdown className='card_dropdown' isOpen={isOpen} toggle={toggle}>
              <DropdownToggle className='card_dropdown_button' color='light'>
                Więcej
              <img
                  className={`${isOpen ? "card_dropdown_clicked" : ""}`}
                  height='30px'
                  src={expand_icon}
                  alt='delete_icon'
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Otwórz czat</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={launch}>Odwołaj</DropdownItem>
                <DropdownItem>Zgłoś</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={launch}>
          <ModalHeader toggle={launch}>Usunąć ofertę?</ModalHeader>
          <ModalBody>Koszt odwołania wynosi: 100zł</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={launch}>
              Usuń
          </Button>
            <Button color='secondary' onClick={launch}>
              Anuluj
          </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};
DashboardReservationListItem.propTypes = {
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DashboardReservationListItem);
