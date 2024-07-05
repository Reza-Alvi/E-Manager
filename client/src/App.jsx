import React from 'react'
import { useState } from 'react';
import { BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom";
import   Home from"./pages/Home";
import RefrshHandler from './RefrsHandler.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './Ap.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }


  return(
  <div className="App">
  <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
 
  <Routes>
    <Route path='/' element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/home' element={<PrivateRoute element={<Home />} />} />
  </Routes>

</div>
  )
}

export default App;


