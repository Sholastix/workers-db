import { useState, useEffect, useRef, Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

import cssStyles from './Navbar.module.css';

import { signout } from '../../redux/actions/auth';

const Navbar = (props) => {
  // State od dropsown menu.
  const [active, setActive] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    // Close dropdown menu by mouse button clicking on everywhere on the window.
    const dropdownHandler = (event) => {
      try {
        if (menuRef.current !== undefined && menuRef.current !== null && !menuRef.current.contains(event.target)) {
          setActive(false);
        };
      } catch (err) {
        console.error(err);
      };
    };

    document.addEventListener('mouseup', dropdownHandler);
  }, []);

  // Here we gather together links which authenticated and authorized users will see.
  const userLinks = (
    <Fragment>
      <Link className={cssStyles.navRefs} to='/employees-list'>Employees</Link>
      <Link ref={menuRef} className={cssStyles.navRefs} onClick={() => { setActive(!active) }} to='#'>
        {props.user !== null && props.user.username} <FontAwesomeIcon icon={active === true ? faCaretUp : faCaretDown} size='xs' />
      </Link>
      <div className={active === true ? cssStyles.dropdownActive : cssStyles.dropdownInactive} >
        <ul>
          <li onClick={props.signout}><Link className={cssStyles.dropdownItem} to='/#'>SignOut</Link></li>
        </ul>
      </div>
    </Fragment>
  );

  // Here we gather together links which guests will see.
  const guestLinks = (
    <Fragment>
      <Link className={cssStyles.navRefs} to='/signin'>SignIn</Link>
      <Link className={cssStyles.navRefs} to='/signup'>SignUp</Link>
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
          {
            props.loading === false && (
              <Fragment>{props.isAuthenticated ? userLinks : guestLinks}</Fragment>
            )}
        </ul>
      </nav>

      <Outlet />
    </Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  signout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

const mapDispatchToProps = {
  signout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);