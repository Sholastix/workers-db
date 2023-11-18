import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Navbar.module.css';

import { signout } from '../../redux/actions/auth';

const Navbar = (props) => {
  // Here we gather together links which authenticated and authorized users will see.
  const userLinks = (
    <Fragment>
      <Link className={cssStyles.navRefs} to='/employees-list'>
        <li>Employees</li>
      </Link>
      <Link className={cssStyles.navRefs} to='#'>
        <li onClick={props.signout}>SignOut</li>
      </Link>
    </Fragment>
  );

  // Here we gather together links which guests will see.
  const guestLinks = (
    <Fragment>
      <Link className={cssStyles.navRefs} to='/signin'>
        <li>SignIn</li>
      </Link>
      <Link className={cssStyles.navRefs} to='/signup'>
        <li>SignUp</li>
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className={cssStyles.container}>
        <p className={cssStyles.logo}>Workers-DB</p>
        <ul className={cssStyles.navLinks}>
          <Link className={cssStyles.navRefs} to='/'>
            <li>Homepage</li>
          </Link>
          {!props.loading && (<Fragment>{props.isAuthenticated ? userLinks : guestLinks}</Fragment>)}
        </ul>
      </nav>

      <Outlet />
    </Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  signout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

const mapDispatchToProps = {
  signout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);