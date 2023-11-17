import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// // VARIANT 1.
// // We wrap each route element in our "App.jsx" individually in this abstract security layer.
// const ProtectedRoute = (props) => {
//   if (!props.isAuthenticated && !props.loading) {
//     return <Navigate to='/signin' replace={true} />;
//   };

//   // 'Children' here is the component (route's element) which we wraps in our 'ProtectedRoute' and want to render ('EmployeesList', 'EmployeesEditForm' etc.).
//   return props.children;
// };

// VARIANT 2.
// All the routes we want to protect have the same authorization level, so VARIANT 1 is not the most convenient choice in this case.
// A better way would be using a Layout Route wich renders the 'ProtectedRoute' component for all nested routes together.
const ProtectedRoute = (props) => {
  if (!props.isAuthenticated && !props.loading) {
    return <Navigate to='/signin' replace={true} />;
  };
  // 'Outlet' is the component that renders child route elements, if there is any.
  return <Outlet />;
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


