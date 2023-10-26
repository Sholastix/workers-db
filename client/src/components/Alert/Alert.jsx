import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Alert.module.css';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    return (
      alerts.map((alert) => (
        alert.alertType === 'danger' ?
          <div key={alert.id} className={cssStyles.danger}>
            {alert.msg}
          </div>
          :
          <div key={alert.id} className={cssStyles.success}>
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