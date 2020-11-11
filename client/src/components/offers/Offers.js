import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOffers } from '../../actions/offer'
import { Spinner } from 'reactstrap';
import offer from '../../reducers/offer';
import OfferItem from './OfferItem';

const Offers = ({ getOffers, offer: { offers, loading } }) => {
    useEffect(() => {
        getOffers();

    }, [getOffers]);
    
    return loading ? <Spinner color='primary' /> : <Fragment>
        <h1>Oferty</h1>
        <div className="offers">
            {offers.map(offer => (
                <OfferItem key = {offer._id} offer =  {offer} />
            ))}
        </div>
        </Fragment>
}

Offers.propTypes = {
    getOffers: PropTypes.func.isRequired,
    offer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    offer: state.offer
})

export default connect(mapStateToProps, { getOffers })(Offers)
