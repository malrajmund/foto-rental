import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import { connect } from 'react-redux';
import offer from '../../reducers/offer';

const OfferItem = ({ auth, offer: { _id, text, offerName, name, avatar,pricePerDay, image, date } }) => {
    return (
        <div>
            Oferta: {image}
            {console.log(image)}
        </div>
    )
}

OfferItem.propTypes = {
    offer: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(OfferItem)

