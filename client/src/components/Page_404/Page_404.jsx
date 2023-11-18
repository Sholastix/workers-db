import React from 'react';
import { Link } from 'react-router-dom';

import cssStyles from './Page_404.module.css';

const Page_404 = () => {
  return (
    <div id={cssStyles.container}>
      <div className={cssStyles.number}>404</div>
      <div>
        <div className={cssStyles.title}>PAGE NOT FOUND</div>
        <div className={cssStyles.section}>
          <p className={cssStyles.text}>Nothing interesting here, time to go back:</p>
          <div className={cssStyles.link}>
            <Link to='/' className={cssStyles.linkText}>Homepage</Link>
          </div>
          <div className={cssStyles.link}>
            <Link to='/employees-list' className={cssStyles.linkText}>Employees List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page_404;