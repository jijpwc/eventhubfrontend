import { useEffect, useState } from 'react';
import Navbar from './components/Common/Navbar';
//import CarouselComponent from './components/CarouselComponent';
import Events from './components/Events/Events';
import Addform from './components/Events/Addform';
import LoginSignup from './components/Auth/LoginSignup';
import {useAuth} from './Hooks/AuthHook';
import { AuthContext } from './shared/AuthContext';
import Profile from "./components/Auth/Profile";
import ReadMore from './components/Events/ReadMore';
import {ToastContainer} from 'react-toastify'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import * as dotenv from "dotenv";
dotenv.config();

function App() {
  
  const {token,isLoggedIn,isUserHr,loginfunc,logout} =useAuth();
  useEffect(()=>{
     loginfunc();
  },[]);
return (
  <>
  <AuthContext.Provider value={{token,isLoggedIn:isLoggedIn,isUserHr:isUserHr,login:loginfunc,logout:logout}}>
      <Router>
        
          <Navbar/>
          <ToastContainer/>
        
        <div className="container">
          <Routes>
            
            <Route exact path="/" element={<Events />}>
            </Route>
            <Route exact path="/add" element={<Addform />}>
            </Route>
            <Route exact path="/login" element={<LoginSignup />}>
            </Route>
            <Route exact path="/profile" element={<Profile />}>
            </Route>
            <Route exact path="/event/:id" element={<ReadMore />}>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App