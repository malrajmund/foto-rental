import { useState, useLayoutEffect, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOffer } from "../../actions/offer";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  Tooltip,
  Form,
  Label,
  Input,
  ModalBody,
  ModalFooter,
  Collapse,
  Table,
} from "reactstrap";
import DashboardOfferListItemRes from "./DashboardOfferListItemRes";
import delete_icon from "../../img/icons/baseline_clear_black_18dp.png";
import expand_icon from "../../img/icons/baseline_expand_more_black_18dp.png";

const DashboardOfferListItem = ({
  deleteOffer,
  offer: { _id, offerName, file, date, reservation, status },
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

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalLock, setModalLock] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const launch = () => setModal(!modal);
  const toggle = () => setIsOpen(!isOpen);
  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);
  const launchLock = () => setModalLock(!modalLock);
  var iterate = 1;
  return (
    <div>
      <Row>
        <Col md='10' id='item_card_col'>
          <a className='item_link' href={`/offers/${_id}`}>
            <Card className='my_item_card'>
              <Row className='no-gutters'>
                <Col xs='5' sm='4' md='3' lg='2'>
                  <CardImg
                    id='my_item_card_img'
                    className='img_square'
                    style={{ height: activeHeight }}
                    top
                    src={"data:image/jpeg;base64," + file.data}
                    alt={file.name}
                  />
                </Col>
                <Col xs='7' sm='8' md='9' lg='10'>
                  <CardBody>
                    <CardTitle tag='h5'>{offerName}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>
                      dodano {date.slice(0, -14)}
                    </CardSubtitle>
                    <p>{status}</p>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </a>
        </Col>
        <Col md='2' id='item_buttons_col'>
          {status === "Aktywna" ? (
            <Button
              color='light'
              className='card_remove_button'
              onClick={launch}
            >
              <img height='40px' src={delete_icon} alt='delete_icon' />
            </Button>
          ) : (
              <Button
                color='light'
                className='card_remove_button'
                disabled
                onClick={launch}
              >
                <img height='40px' src={delete_icon} alt='delete_icon'/>
              </Button>
            )}

          <Button className='card_button' onClick={toggle} color='light'>
            Rezerwacje
            <img
              className={`${isOpen ? "card_button_clicked" : ""}`}
              height='30px'
              src={expand_icon}
              alt='expand_icon'
            />
          </Button>
        </Col>
      </Row>
      <Collapse id='reservations_collapse' isOpen={isOpen}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Najemca</th>
              <th>Data rezerwacji</th>
              <th>Start</th>
              <th>Koniec</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((reservationUser) => (
              <>
                <tr>
                  <th scope='row'>{iterate++}</th>
                  <DashboardOfferListItemRes
                    key={reservationUser._id}
                    reservationUser={reservationUser}
                    offerId={_id}
                  />
                </tr>
              </>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <Button
                  onClick={launchLock}
                  id='lock_date_button'
                  className='table_button'
                  color='light'
                >
                  <i className='material-icons'>add</i>
                </Button>
                <Tooltip
                  placement='left'
                  isOpen={tooltipOpen}
                  target='lock_date_button'
                  toggle={tooltipToggle}
                >
                  Dodaj termin, w którym ta oferta będzie niedostępna.
                </Tooltip>
              </th>
            </tr>
          </tbody>
        </Table>
      </Collapse>

      <Modal isOpen={modal} toggle={launch}>
        <ModalHeader toggle={launch}>Usunąć ofertę?</ModalHeader>
        <ModalBody>
          Usunięcie oferty spowoduje przeniesienie do Archiwum i zablokowanie
          rezerwacji. Nie spowoduje to jednak anulowania nadchodzących
          rezerwacji.
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onClick={(e) => {
              deleteOffer(_id);
              setTimeout(window.location.reload(true), 5000);
            }}
          >
            Usuń
          </Button>
          <Button color='secondary' onClick={launch}>
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalLock} toggle={launchLock}>
        <ModalHeader toggle={launchLock}>
          Dodawanie zablokowanego terminu
        </ModalHeader>
        <ModalBody>
          <Form>
            <legend id='lock_date_legend'>Wybierz termin</legend>
            <Row>
              <Col sm='6'>
                <Label for='date_in'>Od:</Label>
                <Input type='date'></Input>
              </Col>
              <Col sm='6'>
                <Label for='date_in'>Do:</Label>
                <Input type='date'></Input>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalBody>
          W wybranym terminie rezerwacja tej oferty będzie zablokowana. Możliwe
          jest ponowne odblokowanie rezerwacji w dowolnym momencie poprzez
          usunięcie terminu.
        </ModalBody>
        <ModalFooter>
          <Button color='info' onClick={launchLock}>
            Potwierdź
          </Button>
          <Button color='secondary' onClick={launchLock}>
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
DashboardOfferListItem.propTypes = {
  offer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteOffer })(
  DashboardOfferListItem
);
