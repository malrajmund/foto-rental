import {
  Button,
  Card,
  Container,
  CardImg,
  CardText,
  Jumbotron,
  ListGroup,
  Row,
  Col,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import "../../stylesheets/BasketPage.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { reserveOffer } from "../../actions/offer";
import { addChat } from '../../actions/chat';
import Alert from "../layout/Alert";
import delete_icon from "../../img/icons/baseline_clear_black_18dp.png";
import { useHistory } from "react-router-dom";

const BasketPage = ({
  reserveOffer, addChat, auth: { user, isAuthenticated }
}) => {
  /*useEffect(() => {
    getUserCart(match.params.id);
  }, [getUserCart]);*/
  let history = useHistory();
  var cart = [];
  const getCart = () => {
    if (window.localStorage.getItem("cart")) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.forEach((element, index) => {
        cart[index] = JSON.parse(element);
      });
    } else {
      return false;
    }
  };
  getCart();
  const countTotalPrice = () => {
    var totalPrice = 0;
    cart.forEach(function count(element) {
      totalPrice = totalPrice + element.price;
    });
    return totalPrice;
  };

  return (
    <div id='basket_container'>
      <Alert />
      <Container>
        <Row>
          <Col sm='9'>
            <Jumbotron id='basket_items'>
              <h1 className='display-4'>Twój koszyk</h1>
              <hr className='my-2 separator' />
              <div>
                <ListGroup>
                  {cart.length ? (
                    <>
                      {cart.map((item, index) => (
                        <div>
                          <Row>
                            <Col md='10' id='item_card_col'>
                              <a
                                className='item_link'
                                href={`/offers/${item.id}`}
                              >
                                <Card className='my_item_card'>
                                  <Row className='no-gutters'>
                                    <Col sm='3'>
                                      <CardImg id='my_item_card_img' top src={"data:image/jpeg;base64," + item.file} alt={1} />
                                    </Col>
                                    <Col sm='9'>
                                      <CardBody>
                                        <CardTitle tag='h5'>{item?.offerName}</CardTitle>
                                        <CardSubtitle tag='h6' className='mb-2 text-muted'>
                                          okres rezerwacji:{" "}
                                          {item.startDate.slice(0, -14)} -{" "}
                                          {item.endDate.slice(0, -14)}
                                        </CardSubtitle>
                                        <CardText>koszt najmu: {item.price}zł
                                        {item.message ? (<div>wiadomość: <i>{item.message}</i></div>) : null}</CardText>
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </a>
                            </Col>
                            <Col md='2' id='item_buttons_col'>
                              <Button
                                className='cart_reserve_button'
                                color='light'
                                onClick={(e) => {
                                  if (!isAuthenticated) {
                                    history.push('/login')
                                  } else {
                                    reserveOffer(
                                      item.message,
                                      item.startDate.slice(0, -14),
                                      item.endDate.slice(0, -14),
                                      item.id,
                                      item.price
                                    );
                                    addChat(
                                      user,
                                      user.firstName + " " + user.lastName,
                                      item.user,
                                      item.name,
                                      `Dokonano rezerwacji przedmiotu: ${item.offerName}`,
                                      item.message ? item.message : " "
                                    );
                                    cart.splice(index, 1);
                                    cart.forEach((element, index) => {
                                      cart[index] = JSON.stringify(element);
                                    });
                                    cart = JSON.stringify(cart);
                                    window.localStorage.setItem("cart", cart);
                                    window.location.reload();
                                  }
                                }}>Rezerwuj</Button>
                              <Button
                                className='cart_remove_button'
                                color='light'
                                onClick={(e) => {
                                  cart.splice(index, 1);
                                  cart.forEach((element, index) => {
                                    cart[index] = JSON.stringify(element);
                                  });
                                  cart = JSON.stringify(cart);
                                  window.localStorage.setItem("cart", cart);
                                  window.location.reload();
                                }}
                                type='button'>
                                <img height='40px' src={delete_icon} alt='delete_icon'/>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </>) : (
                      <div className='empty_offer_array'>
                        <h1 className='display-3'>Twój koszyk jest pusty...</h1>
                        <a href='/search/results'><h1 className='display-4'>Poszukaj czegoś dla siebie</h1></a>
                      </div>
                    )}

                </ListGroup>

              </div>
            </Jumbotron>
          </Col>
          <Col sm='3'>
            <Card>
              <CardBody>
                <CardTitle tag='h5'>{countTotalPrice(cart)} ZŁ</CardTitle>
                <CardSubtitle tag='h6' className='mb-2 text-muted'>
                  łączny koszt najmu
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

BasketPage.propTypes = {
  addChat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  reserveOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  reserveOffer,
  addChat,
})(BasketPage);
