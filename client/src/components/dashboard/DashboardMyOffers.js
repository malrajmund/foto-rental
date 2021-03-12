import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Spinner,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../../stylesheets/Dashboard.css";

import { getUserOffers, deleteOffer } from "../../actions/offer";
import DashboardOfferListItem from "./DashboardOfferListItem";

const DashboardMyOffers = ({
  getUserOffers,
  offer: { offers, loading },
  auth: { user },
  match,
}) => {
  useEffect(() => {
    getUserOffers(match.params.id);
  }, [getUserOffers]);

  const [formData, setFormData] = useState({
    status: window.sessionStorage.getItem('offer_status') ? window.sessionStorage.getItem('offer_status') : "wszystkie",
  });

  const { status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  var iterate = 0;

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
            <NavLink href={`/myOffers/${user?._id}`} className='active'>
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
            <NavLink href={`/chat`} className='navlink_unactive'>
              Wiadomości
            </NavLink>
          </NavItem>
        </Nav>
        <div id='tab_separator'></div>
        <TabContent activeTab='2'>
          <TabPane tabId='2'>
            <div>
              <Jumbotron id='dashboard_jumbo' fluid>
                <div className='jumbotron_content'>
                  <h1 className='display-4'>Moje oferty</h1>
                  <hr className='my-2 separator' />
                  <Form id='status_form'>
                    <FormGroup>
                      <Label for='status'>
                        Wyszukaj po statusie oferty
                          </Label>
                      <Input
                        type='select'
                        name='status'
                        id='status'
                        value={status}
                        onChange={(e) => onChange(e)}
                      >
                        <option value='Aktywna'>aktywna</option>
                        <option value='Archiwalna'>archiwum</option>
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
                                      <DashboardOfferListItem
                                        key={offer._id}
                                        offer={offer}
                                        loading={loading}
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
                                <a href='/OfferForm'>
                                  <h1 className='display-4'>
                                    Dodaj pierwszą ofertę
                              </h1>
                                </a>
                              </div>
                            )}
                          {iterate ? null : (
                            <div className='empty_offer_array'>
                              <h1 className='display-3'>
                                Nic tu jeszcze nie ma...
                            </h1>
                              <a href='/OfferForm'>
                                <h1 className='display-4'>
                                  Dodaj pierwszą ofertę
                              </h1>
                              </a>
                            </div>
                          )}
                        </>
                      )}
                  </ListGroup>
                </div>
              </Jumbotron>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};
DashboardMyOffers.propTypes = {
  getUserOffers: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserOffers, deleteOffer })(
  DashboardMyOffers
);
