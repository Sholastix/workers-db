import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Alert.module.css';

const Alert = (props) => {
  if (props.alerts !== null && props.alerts.length > 0) {
    return (
      props.alerts.map((alert) => (
        alert.alertType === 'failure' ?
          <div key={alert.id} className={cssStyles.failure}>
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

export default connect(mapStateToProps, null)(Alert);