import React from 'react';

import cssStyles from './Spinner.module.css';

import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div id={cssStyles.container}>
      <img src={spinner} alt='LOADING...' className={cssStyles.spinner} />
    </div>
  );
};

export default Spinner;