import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesCreateForm.module.css';

const EmployeesCreateForm = (props) => {

  // Redirect to signin page if user signed out.
  if (props.isAuthenticated === false) {
    return <Navigate to='/signin' replace={true} />
  };

  return (
    <header className={cssStyles.header}>
      <div>EMPLOYEES CREATE FORM</div>
    </header>
  );
};

EmployeesCreateForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = null;

// 'connect()' function connects a React component to a Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(EmployeesCreateForm);