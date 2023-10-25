import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Alert.module.css';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    return (
      alerts.map((alert) => (
        <div key={alert.id}>
          {alert.msg}
        </div>
      ))
    );
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);