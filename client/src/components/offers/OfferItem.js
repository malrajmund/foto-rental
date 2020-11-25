import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOffer } from "../../actions/offer";
import { Link } from "react-router-dom";
import item_img from "../../img/img/item_thumb.png";
import "../../stylesheets/ItemCard.css";
import person_icon from "../../img/icons/baseline_person_black_18dp.png";
import grade_icon from "../../img/icons/baseline_grade_black_18dp.png";

const OfferItem = ({
  deleteOffer,
  offer: { _id, text, offerName, name, avatar, pricePerDay, file, date },
}) => {
  return (
    <a className='item_link' href={`/offers/${_id}`}>
      <div className='item_card'>
        <img
          className='item_img'
          width='250px'
          height='250px'
          src={"data:image/jpeg;base64," + file.data}
          alt={file.name}
        />
        <p className='item_price'>Cena za dzien: {pricePerDay} zł</p>
        <p className='person_info'>Imie i nazwisko: {name}</p>
        <p className='item_title'>Nazwa: {offerName}</p>
        <button
          onClick={(e) => deleteOffer(_id)}
          type='button'
          className='btn btn-primary'
        >
          Usun
        </button>
      </div>
    </a>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteOffer })(OfferItem);
