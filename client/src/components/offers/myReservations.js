import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserOffers, deleteOffer } from "../../actions/offer";
import { Spinner } from "reactstrap";
import OfferItem from "./OfferItem";
import Alert from "../layout/Alert";

const Offers = ({
  getUserOffers,
  deleteOffer,
  offer: { _id, offers, loading },
  match,
}) => {
  useEffect(() => {
    getUserOffers(match.params.id);
  }, [getUserOffers]);

  function isAccepted(offers) {
    console.log("test");
    for (const dates in offers.reservation) {
      console.log("essa " + offers.reservation[dates].isAccepted);
      if (offers.reservation[dates].isAccepted === false) {
        console.log("essa");
      }
    }
  }

  return loading ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <Alert />
      <h1>Oferty: </h1>
      <div className='offers'>
        {offers.map((offer) => (
          <OfferItem key={offer._id} offer={offer} />
        ))}
      </div>
      <div>{isAccepted(offers)}</div>
    </Fragment>
  );
};

Offers.propTypes = {
  getUserOffers: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { getUserOffers, deleteOffer })(Offers);
