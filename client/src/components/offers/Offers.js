import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOffers } from "../../actions/offer";
import { Spinner } from "reactstrap";
import offer from "../../reducers/offer";
import OfferItem from "./OfferItem";
import "../../stylesheets/ItemCardList.css";

const Offers = ({ getOffers, offer: { offers, loading } }) => {
  useEffect(() => {
    getOffers();
  }, [getOffers]);

  return loading ? (
    <Spinner color='primary' />
  ) : (
    <div className='item_card_list'>
      <div className='list_desc'>
        <p className='item_list_title'>Popularne oferty</p>
        <a className='item_list_link' href='/'>
          Zobacz wszystkie
        </a>
      </div>

      <div className='scrollable_list'>
        <div className='scrollable_row'>
          {offers.map((offer) => (
            <div className='scrollable_col'>
              <OfferItem key={offer._id} offer={offer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Offers.propTypes = {
  getOffers: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { getOffers })(Offers);
