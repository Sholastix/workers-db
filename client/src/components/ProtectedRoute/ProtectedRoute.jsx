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

// // VARIANT 2.
// // All the routes we want to protect have the same authorization level, so VARIANT 1 is not the most convenient choice in this case.
// // A better way would be using a Layout Route wich renders the 'ProtectedRoute' component for all nested routes together.
// const ProtectedRoute = (props) => {
//   if (!props.isAuthenticated && !props.loading) {
//     return <Navigate to='/signin' replace={true} />;
//   };
//   // 'Outlet' is the component that renders child route elements, if there is any.
//   return <Outlet />;
// };

// VARIANT 3.
// There is a problem with VARIANT 2. We can use it only as layout. If we'll try to wrap with it individual component like in VARIANT 1 - our app will crash.
// So, what we need to do? That simple - combination of VARIANT 1 and VARIANT 2 give us all we need.
const ProtectedRoute = (props) => {
  if (!props.isAuthenticated && !props.loading) {
    return <Navigate to='/signin' replace={true} />;
  };
  // Right here we set condition that gives us functionality of both variants.
  return props.children ? props.children : <Outlet />;
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


