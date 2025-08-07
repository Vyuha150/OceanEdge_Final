import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import SignIn from '../Pages/Signin'
import SignUp from '../Pages/Signup'
import Tourism from '../Pages/Tourism'
import Investment from '../Pages/Investment'
import Journer from '../Pages/Journer'
import Wellness from '../Pages/Wellness'
import Occasions from '../Pages/Occasions'
import Booking from '../Pages/Booking'
import AdminPannel from '../Pages/AdminPannel'
import Dining from '../Pages/Dining'
import ProtectedRoute from '../components/ProtectedRoute'

const Navroutes = ({ onLogin, user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/purchase" element={<Investment/>} />
      <Route path="/tourism" element={<Tourism/>} />
      <Route path="/our-journey" element={<Journer/>} />
      <Route path="/wellness-centre" element={<Wellness/>} />
      <Route path="/occasions-and-meetups" element={<Occasions/>} />
      <Route path="/booking" element={<Booking/>} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute user={user}>
            <AdminPannel/>
          </ProtectedRoute>
        } 
      />
      <Route path="/dining" element={<Dining/>} />
      <Route path="/signin" element={<SignIn onLogin={onLogin} />} />
      <Route path="/signup" element={<SignUp onLogin={onLogin} />} />
    </Routes>
  )
}

export default Navroutes