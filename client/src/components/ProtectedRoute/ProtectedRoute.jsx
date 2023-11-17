import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// VARIANT 1.
// We wrap each route element in our 'App.jsx' separately in this abstract protection layer.
const ProtectedRoute = (props) => {
  if (!props.isAuthenticated && !props.loading) {
    return <Navigate to='/signin' replace={true} />;
  };

  return props.children;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);


