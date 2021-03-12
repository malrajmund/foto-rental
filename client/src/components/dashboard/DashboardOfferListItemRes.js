import delete_icon from "../../img/icons/baseline_clear_black_18dp.png";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeReservationAsOwner } from "../../actions/offer";
import Alert from "../layout/Alert";

const DashboardOfferListItemRes = ({
  removeReservationAsOwner,
  reservationUser,
  offerId,
}) => {
  const [modal, setModal] = useState(false);
  const launch = () => setModal(!modal);

  return (
    <>
      <td>{reservationUser.name}</td>
      <td>{reservationUser.date?.slice(0, -14)}</td>
      <td>{reservationUser.date_in?.slice(0, -14)}</td>
      <td>{reservationUser.date_out?.slice(0, -14)}</td>
      <td>{reservationUser.status}</td>
      <td>
        {reservationUser.status === "nadchodząca" ? (
          <Button onClick={launch} className='table_button' color='light'>
            <i className='material-icons'>clear</i>
          </Button>
        ) : (
            <Button
              onClick={launch}
              className='table_button'
              color='light'
              disabled
            >
              <img height='25px' src={delete_icon} alt='delete_icon'/>
            </Button>
          )}
      </td>
      <Modal isOpen={modal} toggle={launch}>
        <ModalHeader toggle={launch}>Odwołać rezerwację?</ModalHeader>
        <ModalBody>
          Spowoduje to nieodwracalne zerwanie umowy z najemcą.
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onClick={(e) =>
              removeReservationAsOwner(reservationUser._id, offerId)
                .then(window.location.reload())
                .then(<Alert />)
            }
          >
            Odwołaj
          </Button>{" "}
          <Button color='secondary' onClick={launch}>
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

DashboardOfferListItemRes.propTypes = {
  removeReservationAsOwner: PropTypes.func.isRequired,
  reservationUser: PropTypes.object.isRequired,
};

export default connect(null, { removeReservationAsOwner })(
  DashboardOfferListItemRes
);
