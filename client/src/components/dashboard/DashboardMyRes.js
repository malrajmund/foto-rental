import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import "../../stylesheets/Dashboard.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getReservations } from "../../actions/offer";
import DashboardReservationListItem from "./DashboardReservationListItem";

const DashboardMyRes = ({
  getReservations,
  auth: { user },
  offer: { offers, loading },
  match,
}) => {
  useEffect(() => {
    getReservations(match.params.id);
  }, [getReservations]);
  const [formData, setFormData] = useState({
    status: window.sessionStorage.getItem('res_status') ? window.sessionStorage.getItem('res_status') : "wszystkie",
  });

  const { status } = formData;
  var iterate = 0;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div id='asdasd'>
      <div id='dashboard_container'>
        <Nav tabs id='dashboard_tabs'>
          <NavItem>
            <NavLink href='/dashboard' className='navlink_unactive'>
              Konto
            </NavLink>
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
            <NavLink href={`/myReservations/${user?._id}`} className='active'>
              Moje rezerwacje
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/chat`} className='navlink_unactive'>
              Wiadomości
            </NavLink>
          </NavItem>
        </Nav>
        <div id='tab_separator'></div>
        <TabContent activeTab='3'>
          <TabPane tabId='3'>
            <Jumbotron fluid>
              <div className='jumbotron_content'>
                <h1 className='display-4'>Moje rezerwacje</h1>
                <hr className='my-2 separator' />
                <Form id='status_form'>
                      <FormGroup>
                        <Label for='res_status'>
                          Wyszukaj po statusie rezerwacji
                        </Label>
                        <Input
                          type='select'
                          name='status'
                          id='status'
                          value={status}
                          onChange={(e) => onChange(e)}
                        >
                          <option value='nadchodząca'>nadchodząca</option>
                          <option value='trwająca'>trwająca</option>
                          <option value='opłacona'>opłacona</option>
                          <option value='archiwalna'>archiwalna</option>
                          <option value='wszystkie'>wszystkie</option>
                        </Input>
                      </FormGroup>
                </Form>
                <ListGroup>
                  {loading ? (
                    <Spinner color='primary' className='load_spinner' />
                  ) : (
                      <>
                        {offers.length ? (
                          <>
                            {offers.map((offer) =>
                              offer.status === status ||
                                status === "wszystkie" ? (
                                  <ListGroupItem id={"item" + iterate++}>
                                    <DashboardReservationListItem
                                      key={offer.id}
                                      offer={offer}
                                      searchStatus={status}
                                    />
                                  </ListGroupItem>
                                ) : null
                            )}
                          </>
                        ) : (
                            <div className='empty_offer_array'>
                              <h1 className='display-3'>
                                Nic tu jeszcze nie ma...
                          </h1>
                              <a href='/search/results'>
                                <h1 className='display-4'>Znajdź coś dla siebie</h1>
                              </a>
                            </div>
                          )}
                        {iterate ? null : (
                          <div className='empty_offer_array'>
                            <h1 className='display-3'>
                              Nic tu jeszcze nie ma...
                          </h1>
                            <a href='/search/results'>
                              <h1 className='display-4'>Znajdź coś dla siebie</h1>
                            </a>
                          </div>
                        )}
                      </>
                    )}
                </ListGroup>
              </div>
            </Jumbotron>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

DashboardMyRes.propTypes = {
  getReservations: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  offer: state.offer,
});

export default connect(mapStateToProps, { getReservations })(DashboardMyRes);
