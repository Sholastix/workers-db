import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Redux Setup
import { Provider } from 'react-redux';
import store from './redux/store/store';
import setAuthToken from './utils/setAuthToken';
import { isUserSigned } from './redux/actions/auth';

// If there is token in LocalStorage, then we put it in global header.
if (localStorage.token) {
  setAuthToken();
};

const App = () => {
  useEffect(() => {
    store.dispatch(isUserSigned());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div id={cssStyles.container}>
          <div>
            <Navbar />
          </div>
          <div className={cssStyles.section}>
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/employees-create-form' element={<EmployeesCreateForm />} />
                <Route path='/employees-edit-form' element={<EmployeesEditForm />} />
                <Route path='/employees-list' element={<EmployeesList />} />
              </Route>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<Page_404 />} />
            </Routes>
            <Alert />
          </div>
          <div className={cssStyles.footer}>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
