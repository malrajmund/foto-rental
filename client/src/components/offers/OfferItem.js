import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import offer from "../../reducers/offer";

const OfferItem = ({
  auth,
  offer: { _id, text, offerName, name, avatar, pricePerDay, file, date },
}) => {
  return (
    <div>
      Oferta: <div>Opis: {text}</div>
      <div>Nazwa: {offerName}</div>
      <div>Cena za dzien: {pricePerDay}</div>
      <div>Data dodania: {date}</div>
      <img
        width='250px'
        height='250px'
        src={"data:image/jpeg;base64," + file.data}
        alt={file.name}
      />
    </div>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(OfferItem);
