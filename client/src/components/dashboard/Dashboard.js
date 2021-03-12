import React from "react";
import {
  Card,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Col,
  Jumbotron,
  Table,
  CardBody,
  CardText,
  CardTitle,
  Button,
  CardSubtitle,
  Spinner,
} from "reactstrap";
import "../../stylesheets/Dashboard.css";
import { connect } from "react-redux";

const Dashboard = ({ auth: { user, loading } }) => {
  const goToMyOffers = status => {
    window.sessionStorage.setItem('offer_status', status);
    window.location.href = `/myOffers/${user?._id}`;
  }
  const goToMyRes = status => {
    window.sessionStorage.setItem('res_status', status);
    window.location.href = `/myReservations/${user?._id}`;
  }
  return loading ? (
    <Spinner className='load_spinner' color='primary' />
  ) : (
      <div id='asdasd'>
        <div id='dashboard_container'>
          <Nav tabs id='dashboard_tabs'>
            <NavItem>
              <NavLink className='active'>Konto</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={`/myOffers/${user?._id}`}
                className='navlink_unactive'
              >
                Moje oferty
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={`/myReservations/${user?._id}`}
                className='navlink_unactive'
              >
                Moje rezerwacje
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={`/chat`}
                className='navlink_unactive'>
                Wiadomości
            </NavLink>
            </NavItem>
          </Nav>
          <div id='tab_separator'></div>
          <TabContent activeTab='1'>
            <TabPane tabId='1'>
              <Jumbotron fluid>
                <div className='jumbotron_content'>
                  <h2 className='display-4'>
                    {user?.firstName + " " + user?.lastName}
                  </h2>
                  <p className='lead'>{user?.email}</p>
                  <hr className='my-2 separator' />
                  <Row>
                    <Col lg='6' className='col_separate'>
                      <Card className='dashboard_user_card'>
                        <CardBody>
                          <CardTitle className='card_top'>
                            <i className='material-icons card_icon'>
                              account_circle
                          </i>
                            <h3 className='card_title'>Dane osobowe</h3>
                          </CardTitle>
                          <CardText className='card_middle'>
                            <Table id='user_info_table' borderless size='sm'>
                              <tbody>
                                <tr>
                                  <th>Imię i nazwisko:</th>
                                  <th>{user?.firstName + " " + user?.lastName}</th>
                                </tr>
                                <tr>
                                  <th>Adres email:</th>
                                  <th>{user?.email}</th>
                                </tr>
                                <tr>
                                  <th>Numer telefonu:</th>
                                  <th>{user?.phoneNumber}</th>
                                </tr>
                                <tr>
                                  <th>Adres zamieszkania:</th>
                                  <th>
                                    {"ul. " +
                                      user?.street +
                                      " " +
                                      user?.streetNumber}
                                    <p>{user?.postCode + " " + user?.town}</p>
                                  </th>
                                </tr>
                              </tbody>
                            </Table>
                          </CardText>
                          <Button color='info'>Zmień hasło</Button>{" "}
                          <Button color='info'>Zmień dane</Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg='6' className='col_separate'>
                      <Card className='dashboard_user_card'>
                        <CardBody>
                          <CardTitle className='card_top'>
                            <i className='material-icons card_icon'>thumb_up</i>
                            <h3 className='card_title'>Oceny</h3>
                          </CardTitle>
                          <CardText>
                            <Table id='user_grades_table' borderless>
                              <tbody>
                                <tr>
                                  <th>Średnia ocen:</th>
                                  <th>
                                    <span className='span_grade'>
                                      <i className='material-icons orange size24'>
                                        grade
                                  </i>
                                      <b>4.5</b>
                                    </span>
                                  </th>
                                </tr>
                                <tr>
                                  <th>Otrzymane:</th>
                                  <th>
                                    <a href='/'>zobacz</a>
                                  </th>
                                </tr>
                                <tr>
                                  <th>Wystawione:</th>
                                  <th>
                                    <a href='/'>zobacz</a>
                                  </th>
                                </tr>
                              </tbody>
                            </Table>
                          </CardText>
                          <Button color='info'>Wystaw ocenę</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' className='col_separate'>
                      <Card className='dashboard_user_card'>
                        <CardBody>
                          <CardTitle className='card_top'>
                            <i className='material-icons card_icon'>swap_horiz</i>
                            <h3 className='card_title'>Najem</h3>
                          </CardTitle>
                          <CardText className='card_middle'>
                            <h5>Moje oferty:</h5>
                            <Row>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={() => goToMyOffers('Aktywna')}>
                                  Aktualne
                              </Button>
                              </Col>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={() => goToMyOffers('Archiwalna')}>
                                  Archiwum
                              </Button>
                              </Col>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={() => window.location.href = '/OfferForm'}>
                                  Wystaw
                              </Button>
                              </Col>
                            </Row>
                            <h5>Moje rezerwacje:</h5>
                            <Row>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={()=> goToMyRes('wszystkie')}>
                                  Wszystkie
                              </Button>
                              </Col>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={()=> goToMyRes('nadchodząca')}>
                                  Nadchodzące
                              </Button>
                              </Col>
                              <Col sm='4'>
                                <Button color='info' className='card_rent_button' onClick={()=> goToMyRes('opłacona')}>
                                  Opłacone
                              </Button>
                              </Col>
                            </Row>
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg='6' className='col_separate'>
                      <Card className='dashboard_user_card'>
                        <CardBody>
                          <CardTitle className='card_top'>
                            <i className='material-icons card_icon'>chat</i>
                            <h3 className='card_title'>Wiadomości</h3>
                          </CardTitle>
                          <CardSubtitle tag='h5' className='mb-2 text-muted'>
                            Wbudowany chat pozwala na łatwy i szybki kontakt z
                            innymi użytkownikami. Rozpocznij rozmowę na stronie
                            wybranej oferty lub profilu innego użytkownika.
                        </CardSubtitle>
                          <CardText>
                            <a id='chat_link' href='/chat'>
                              Moje wiadomości
                          </a>
                            <a href='/'>Regulamin</a>
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Jumbotron>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
