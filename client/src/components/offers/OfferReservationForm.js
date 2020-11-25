import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOffer, reserveOffer } from "../../actions/offer";
import { FormGroup, Button, Form, Spinner, Label, Input } from "reactstrap";
import Alert from "../layout/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OfferItem from "./OfferItem";
import moment from "moment";
import offer from "../../reducers/offer";

const Offers = ({
  getOffer,
  reserveOffer,
  offer: {
    _id,
    text,
    offerName,
    name,
    avatar,
    pricePerDay,
    file,
    date,
    offers,
    loading,
  },
  match,
}) => {
  useEffect(() => {
    getOffer(match.params.id);
    //console.log(file.name);
  }, [getOffer]);
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    getFirstReservatedDate(start, offers);
    setStartDate(start);
    setEndDate(end);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    reserveOffer({ message, startDate, endDate }, offers._id);
  };

  function TotalPrice(offers, endDate, startDate) {
    if (endDate === null || startDate === null) {
      return 0;
    }
    return (
      offers.pricePerDay *
      ((endDate.valueOf() - startDate.valueOf()) / 86400000)
    );
  }

  function getReservatedDates(offers) {
    const unixDatesArray = [];
    var oneDay = 86400000;
    for (const dates in offers.reservation) {
      const reservationDateInFromDb = new Date(
        offers.reservation[dates].date_in
      ).valueOf();
      const reservationDateOutFromDb = new Date(
        offers.reservation[dates].date_out
      ).valueOf();
      unixDatesArray.push(reservationDateInFromDb);
      unixDatesArray.push(reservationDateOutFromDb);
      while (reservationDateInFromDb + oneDay < reservationDateOutFromDb) {
        unixDatesArray.push(reservationDateInFromDb + oneDay);
        oneDay = oneDay + 86400000;
      }
      oneDay = 86400000;
    }
    //console.log(unixDatesArray);
    return unixDatesArray;
  }

  function getFirstReservatedDate(startDate, offers) {
    if (startDate === null) {
      return null;
    }
    for (const dates in offers.reservation) {
      if (
        startDate.valueOf() <
        new Date(offers.reservation[dates].date_in).valueOf()
      ) {
        return new Date(offers.reservation[dates].date_in).valueOf();
      }
    }
    return null;
  }

  return loading ? (
    <Spinner color='primary' />
  ) : (
    <Fragment>
      <div>
        <h1>Rezerwacja oferty:</h1>
        <div>Opis: {offers.text}</div>
        <div>Nazwa: {offers.offerName}</div>
        <div>Cena za dzien: {offers.pricePerDay}</div>
        <div>Data dodania: {offers.date}</div>
        <div>Imie i nazwisko: {offers.name}</div>
        <img
          width='250px'
          height='250px'
          src={"data:image/jpeg;base64," + offers.file.data}
          alt={offers.file.name}
        />
      </div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <DatePicker
            selected={null}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            excludeDates={getReservatedDates(offers)}
            minDate={new Date()}
            maxDate={getFirstReservatedDate(startDate, offers)}
            selectsRange
            inline
          />
        </FormGroup>

        <FormGroup>
          <Label for='item_desc'>Wiadomość do najemcy</Label>
          <Input
            type='textarea'
            name='message'
            id='message'
            placeholder='Wiadomosc...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>
        <h3>Twoja cena: {TotalPrice(offers, endDate, startDate)} zł</h3>
        <Button
          name='submit_button'
          id='submit_button'
          className='submit_button'
          type='submit'
        >
          Rezerwuj oferte
        </Button>
      </Form>

      <Alert />
    </Fragment>
  );
};

Offers.propTypes = {
  getOffer: PropTypes.func.isRequired,
  reserveOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
});

export default connect(mapStateToProps, { getOffer, reserveOffer })(Offers);
