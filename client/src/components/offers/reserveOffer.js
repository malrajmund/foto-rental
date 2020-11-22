import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reserveOffer } from "../../actions/offer";
import { Spinner } from "reactstrap";
import Alert from "../layout/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Offers = ({ reserveOffer, offer: { offers, loading }, match }) => {
  useEffect(() => {
    reserveOffer(match.params.id);
  }, [reserveOffer]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return loading ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <div>
        Oferta:
        <div>Opis: {offers.text}</div>
        <div>Nazwa: {offers.offerName}</div>
        <div>Cena za dzien: {offers.pricePerDay}</div>
        <div>Data dodania: {offers.date}</div>
        <img
          width='250px'
          height='250px'
          alt={offers.file.name}
          src={"data:image/jpeg;base64," + offers.file.data}
        />
      </div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={offers.reserved}
        selectsRange
        inline
      />
    </Fragment>
  );
};

Offers.propTypes = {
  reserveOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { reserveOffer })(Offers);
