import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ auth: { id } }) => {
  return (
    <Link to={`/myOffers/${id}`} className='btn btn-primary'>
      Moje oferty
    </Link>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
