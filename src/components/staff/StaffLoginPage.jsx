import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
import axios from 'axios';
import {Link} from 'react-router-dom'


const StaffLoginPage = () => {
  const[staffData,setStaffData]=useState({
    email:'',
    password:'',
    
  })
  const navigate = useNavigate(); 

  const setInput=(e)=>
  {
    const{name,value}=e.target;
    setStaffData({...staffData,[name]:value})
  }


  const handleLogin = async() => {

  if(!staffData.email||!staffData.password)
  {
    alert('Please enter both email and password')
    return;
  }

try{
  const response=await axios.post('http://localhost:2000/api/users/staff-login',
    {
      email:staffData.email,
      password:staffData.password,
    })
    const {token,role}=response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    

    navigate('/staff/dashboard');
    alert('Login Successful');
}

catch (error) {
  if (error.response && error.response.status === 401) {
      alert('Invalid credentials');
  } else {
      alert('Server error. Please try again later.');
  }
}

  }




  return (
    <>
   
   <div className='container1'>
    <div className="login-container">
      <h1> Staff Login</h1>
      <i className="fa-solid fa-user-tie"></i>
      <div className="input">
      <input
        type="text"
        placeholder="Username"
        name='email'
        value={setInput.email}
        onChange={setInput}
        className="input"
        autoComplete='off'
      />
      <input
        type="text"
        name='password'
        placeholder="Password"
        value={setInput.password}
        onChange={setInput}
        className="input"
        autoComplete='off'
        id='password'
      />
      </div>
      <button onClick={handleLogin} className="btnn">Login</button>
    </div>

<Link to="/">
<button>Back</button>
</Link>
    
    </div>


  </>

  );
};

export default StaffLoginPage;