import React, { useLayoutEffect, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../stylesheets/ItemCard.css";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

const OfferItem = ({ offer: { _id, offerName, name, pricePerDay, file }, }) => {
  const [activeHeight, setActiveHeight] = useState(0);
  const setHeight = height => {
    if (activeHeight !== height) setActiveHeight(height);
  }
  useLayoutEffect(() => {
    setTimeout(() => setHeight(document.getElementById("my_item_card_img")?.getBoundingClientRect().width), 100);
  })
  useEffect(() => {
    function handleResize() {
      setHeight(document.getElementById("my_item_card_img")?.getBoundingClientRect().width);
    }
    window.addEventListener('resize', handleResize);
  })

  return (
    <a className='item_link' href={`/offers/${_id}`}>
      <Card className='item_card'>
        <CardImg
          id='my_item_card_img'
          className='img_square'
          style={{ height: activeHeight * 0.8 }}
          top
          src={"data:image/jpeg;base64," + file.data}
          alt={file.name}
        />
        <CardBody className='item_cardbody'>
          <CardTitle className='item_price'>
            {pricePerDay}zł <small className='item_price2'>/dzień</small>
          </CardTitle>
          <CardText>
            <span className='span_grade person_info'>
              <i className='material-icons size24'>person</i>
              {name}
              <i className='material-icons orange size24 grade_margin'>grade</i>
              <b>4.5</b>
            </span>
            <p className='item_title'>{offerName}</p>
          </CardText>
        </CardBody>
      </Card>
    </a>
  );
};
OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(OfferItem);
