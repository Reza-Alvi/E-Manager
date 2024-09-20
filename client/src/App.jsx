import React from 'react'
import { useState } from 'react';
import { BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom";
import Home from"./pages/Home";
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import RefrshHandler from './RefrsHandler.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import './Ap.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }


  return(
  <div  className='App'>
  <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
 
  <Routes>
    <Route path='/' element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/home' element={<PrivateRoute element={<Home />} />} />
    <Route path="/add-employee" element={<AddEmployee />} />
    <Route path="/edit-employee/:id" element={<EditEmployee />} />
    <Route path="/employee-details/:id" element={<EmployeeDetails />} /> 
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile-details" element={<ProfileDetails />} />
  </Routes>

</div>
  )
}

export default App;
