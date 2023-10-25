import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import EmployeesCreateForm from './components/Employees/EmployeesCreateForm';
import EmployeesEditForm from './components/Employees/EmployeesEditForm';
import EmployeesList from './components/Employees/EmployeesList';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

// Redux Setup
import { Provider } from 'react-redux';
import store from './redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Navbar />}>
            <Route index element={<Homepage />} />
            <Route path='/employees-list' element={<EmployeesList />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/employees-create-form' element={<EmployeesCreateForm />} />
          <Route path='/employees-edit-form' element={<EmployeesEditForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
