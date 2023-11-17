import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// 'children' is the component (route's element) such as 'EmployeesList', 'EmployeesEditForm' etc., which wrapped by 'ProtectedRoute'. 
// 'ProtectedRoute' works as wrapping component, can't work as layout component.
// 'Outlet' renders child route elements, if there is any. Works as layout component, can't work as wrapping component.
const ProtectedRoute = (props) => {
  if (!props.isAuthenticated && !props.loading) {
    return <Navigate to='/signin' replace={true} />;
  };
  // Switching between 'children' and 'Outlet' allows to 'wrap' routes in auth protection individually (with wrapper) or as group (with layout). 
  // Layout can also be used to protect individual route, but that would be a waste of space :)
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


