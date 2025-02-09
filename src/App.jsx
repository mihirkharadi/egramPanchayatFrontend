import React from 'react'
import './App.css'
import './index.css'
import { Link } from "react-router-dom";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/admin/LoginPage'
import Dashboard from './components/common/Dashboard'
import Schemes from './components/admin/Schemes';
import Approval from './components/admin/Approval';
import StaffApproval from './components/staff/StaffApproval'
import Records from './components/admin/Records';
import Documents from './components/admin/Documents';
import StaffLoginPage from './components/staff/StaffLoginPage';
import UserLoginPage from './components/Users/UserLoginPage';
import UserScheme from './components/Users/UserScheme';
import ComplaintForm from './components/Users/ComplaintForm';
import StaffResolve from './components/staff/StaffResolve';
import ApplicationStatus from './components/Users/ApplicationStatus';
import StaffRecords from './components/staff/StaffRecords';
import Profile from './components/admin/Profile';
import StaffProfile from './components/staff/StaffProfile'



const App = () => {
  return (
    <>

<Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<Profile />} /> 
        <Route path="/admin/dashboard/schemes" element={<Schemes />}/>
        <Route path='/admin/dashboard/approval' element={<Approval/>}/>
        <Route path='/admin/dashboard/records' element={<Records/>}/>
        <Route path='/admin/dashboard/documents-issue' element={<Documents/>}/>
        <Route path='/staff/login' element={<StaffLoginPage/>}/>
        <Route path='/staff/dashboard' element={<StaffProfile/>}/>
        <Route path='/staff/dashboard/problem' element={<StaffResolve/>}/>
        <Route path='/staff/dashboard/approval' element={<StaffApproval/>}/>
        <Route path='/staff/dashboard/records' element={<StaffRecords/>}/>
        <Route path='/staff/dashboard/profile' element={<StaffProfile/>}/>
        <Route path='/admin/dashboard/profile' element={<Profile/>}/>
        <Route path='/user/login' element={<UserLoginPage/>}/>
        <Route path='/user/dashboard' element={<Dashboard/>}/>
        <Route path='/user/dashboard/profile' element={<Dashboard/>}/>
        <Route path='/user/dashboard/application-status' element={<ApplicationStatus/>}/>
        <Route path='/user/dashboard/complain' element={<ComplaintForm/>}/>
        <Route path='/user/dashboard/schemes' element={<UserScheme/>}/>
        
      </Routes>
    </Router>



    </>

  )
}

const MainPage =()=>
{
  return(
    <>
<div className="container0">
  <div className="logo">
  <img src="logo.png" alt="Logo" className="logo"/>
  </div>
   

    <div className="buttons">
    <Link to="/admin/login" >
  <button className="btns" >Admin</button>
</Link>

<Link to="/staff/login">
  <button className="btns">Staff</button>
</Link>
<Link to="/user/login" >
  <button className="btns">User</button>
</Link>
    
   


     
     
    </div>
  </div>



    </>
  )
}

export default App
