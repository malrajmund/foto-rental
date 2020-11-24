import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOffer } from "../../actions/offer";
import { FormGroup, Button, Form, Spinner } from "reactstrap";
import Alert from "../layout/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OfferItem from "./OfferItem";
import moment from "moment";

const Offers = ({ getOffer, offer: { offers, loading }, match }) => {
  useEffect(() => {
    getOffer(match.params.id);
    //console.log(file.name);
  }, [getOffer]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  function getReservatedDates(offers) {
    const unixDatesArray = [];
    var oneDay = 86400000;
    for (const reservations in offers.reservation) {
      const reservationDateInFromDb = new Date(
        offers.reservation[reservations].date_in
      ).valueOf();
      const reservationDateOutFromDb = new Date(
        offers.reservation[reservations].date_out
      ).valueOf();
      unixDatesArray.push(reservationDateInFromDb);
      unixDatesArray.push(reservationDateOutFromDb);
      while (reservationDateInFromDb + oneDay < reservationDateOutFromDb) {
        unixDatesArray.push(reservationDateInFromDb + oneDay - 1);
        oneDay = oneDay + 86400000;
      }

      oneDay = 86400000;
    }
    console.log(unixDatesArray);
    return unixDatesArray;
  }

  return loading ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <div className='offers'>
        {[offers].map((offer) => (
          <OfferItem key={offer._id} offer={offer} />
        ))}
      </div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            excludeDates={getReservatedDates(offers)}
            selectsRange
            inline
          />
        </FormGroup>
        <Button
          name='submit_button'
          id='submit_button'
          className='submit_button'
          type='submit'
        >
          Rezerwuj oferte
        </Button>
      </Form>
    </Fragment>
  );
};

Offers.propTypes = {
  getOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { getOffer })(Offers);
