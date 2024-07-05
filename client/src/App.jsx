import { useState, useEffect } from "react";
import "./app.css";

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
