import React from 'react'

import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import RouteAuth from './RouteAuth';

export default function Routers() {

  return(
    <Routes >
      <Route path='/' element={<RouteAuth><SignIn/></RouteAuth>} />
      <Route path='/signup'  element={<RouteAuth><SignUp/></RouteAuth>} />
      <Route path='/dashboard' element={<RouteAuth isPrivate><Dashboard/></RouteAuth>} />
    </Routes>
  )
}

//<Route path='/' element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
//<Route path='/signup'  element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
//<Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" /> } />