import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesEditForm.module.css';

const EmployeesEditForm = (props) => {

  return (
    <header className={cssStyles.header}>
      <div>EMPLOYEES EDIT FORM</div>
    </header>
  );
};

EmployeesEditForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesEditForm);