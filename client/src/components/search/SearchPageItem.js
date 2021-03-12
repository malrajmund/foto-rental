import { CardBody, CardText, CardTitle, CardSubtitle, CardImg, Container, Row, Col, Card,} from "reactstrap";
import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const SearchPageItem = ({
  item: { _id, offerName, name, pricePerDay, pricePerWeek, file, date },
}) => {
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
    <a className='item_link full_width' href={"/offers/" + _id}>
      <Card>
        <Container fluid>
          <Row>
            <Col className='no_padding_col' md='3' lg='2'>
              <CardImg
                id='my_item_card_img'
                className='img_square'
                style={{ height: activeHeight }}
                top
                src={"data:image/jpeg;base64," + file.data}
                alt='Card image cap'
              />
            </Col>
            <Col lg='7' md='6'>
              <CardBody>
                <CardTitle tag='h5'>{offerName}</CardTitle>
                <CardSubtitle tag='h6' className='mb-2 text-muted'>
                  dodano: {date.slice(0, -14)}
                </CardSubtitle>
                <CardText className='searchitem_username'>
                  {name} <i className='material-icons orange'>grade</i>
                  <b>4.5</b>
                </CardText>
              </CardBody>
            </Col>
            <Col>
              <CardBody>
                <CardTitle>
                  <div id='day_price'>
                    {pricePerDay}zł
              <span> /dzień</span>
                  </div>
                  <div id='week_price'>
                    {pricePerWeek}zł
              <span> /tydzień</span>
                  </div>
                </CardTitle>
              </CardBody>
            </Col>
          </Row>
        </Container></Card>
    </a>
  );
};

SearchPageItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default connect(null, {})(SearchPageItem);
