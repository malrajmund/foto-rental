import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOffer, reserveOffer } from "../../actions/offer";
import { Link } from "react-router-dom";

const OfferItem = ({
  auth,
  deleteOffer,
  reserveOffer,
  offer: { _id, text, offerName, name, avatar, pricePerDay, file, date },
}) => {
  return (
    <Fragment>
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
      <button onClick={(e) => deleteOffer(_id)} type='button'>
        Usun
      </button>
      <Link to={`/offers/${_id}`} className='btn btn-primary'>
        Rezerwuj
      </Link>
    </Fragment>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
  reserveOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteOffer, reserveOffer })(
  OfferItem
);
