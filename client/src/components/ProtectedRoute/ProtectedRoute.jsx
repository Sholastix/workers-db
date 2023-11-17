import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// VARIANT 1.
// We wrap each route element in our "App.jsx" individually in this abstract security layer.
const ProtectedRoute = (props) => {
  if (!props.isAuthenticated && !props.loading) {
    return <Navigate to='/signin' replace={true} />;
  };

  // 'Children' here is the components which we wraps in our 'ProtectedRoute' and wants to render ('EmployeesList', 'EmployeesEditForm' etc.).
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


