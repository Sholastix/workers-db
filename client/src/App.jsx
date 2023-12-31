import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './App.module.css';

import Alert from './components/Alert/Alert';
import EmployeesCreateForm from './components/Employees/EmployeesCreateForm';
import EmployeesEditForm from './components/Employees/EmployeesEditForm';
import EmployeesList from './components/Employees/EmployeesList';
import Footer from './components/Footer/Footer';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Page_404 from './components/Page_404/Page_404';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

import { isUserSigned } from './redux/actions/auth';

const App = (props) => {
  useEffect(() => {
    // Every time when page reloaded we check if user signed in.
    props.isUserSigned();
  }, []);

  return (
    <Router>
      <div id={cssStyles.container}>
        <div>
          <Navbar />
        </div>
        <div className={cssStyles.section}>
          <Alert />
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/employees-create-form' element={<EmployeesCreateForm />} />
              <Route path='/employees-edit-form/:id' element={<EmployeesEditForm />} />
              <Route path='/employees-list' element={<EmployeesList />} />
            </Route>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Page_404 />} />
          </Routes>
        </div>
        <div className={cssStyles.footer}>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

App.propTypes = {
  isUserSigned: PropTypes.func.isRequired,
};

const mapStateToProps = null;

const mapDispatchToProps = {
  isUserSigned
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
