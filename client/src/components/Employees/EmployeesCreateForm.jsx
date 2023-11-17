import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesCreateForm.module.css';

const EmployeesCreateForm = (props) => {

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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesCreateForm);