import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom';

import cssStyles from './Navbar.module.css';

const Navbar = () => {
  return (
    <Fragment>
      <nav id={cssStyles.container}>
        <h1 className={cssStyles.logo}>WORKERS-DB</h1>
        <ul className={cssStyles.navLinks}>
          <Link className={cssStyles.navRefs} to='/'>
            <li>Homepage</li>
          </Link>
          <Link className={cssStyles.navRefs} to='/employees-list'>
            <li>Employees</li>
          </Link>
          <Link className={cssStyles.navRefs} to='/signin'>
            <li>SignIn</li>
          </Link>
          <Link className={cssStyles.navRefs} to='/signup'>
            <li>SignUp</li>
          </Link>
        </ul>
      </nav>

      <Outlet />
    </Fragment>
  );
};

export default Navbar;