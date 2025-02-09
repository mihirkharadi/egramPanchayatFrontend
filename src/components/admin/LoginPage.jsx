import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
import axios from 'axios';
import { Link } from "react-router-dom";



const LoginPage = () => {
  const[formData,setFormData]=useState(
    {
      email:'',
      password:'',
      name:'',
    }
  )
 
  const navigate = useNavigate(); 
  const handleChangeField = (e) => {
    const{name , value}=e.target
    setFormData({ ...formData, [name]:value });
  };
 

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2000/api/users/admin-login', {

        email: formData.email,
        password: formData.password,
      });

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      

      navigate('/admin/dashboard');
      alert('Login Successful');
    } catch (error) {
      if (error.response && error.response.status === 401) {
          alert('Invalid credentials');
      } else {
          alert('Server error. Please try again later.');
      }
  }
  
  };

  return (
    <div className='container1'>
    <div className="login-container">
      <h1> Admin Login</h1>
      <i className="fa-solid fa-user-tie"></i>
      <div className="input">
      <input
        type="text"
        name='email'
        placeholder="Username"
        value={formData.email}
        onChange={handleChangeField}
        className="input"
       autoComplete='off'
      />
      <input
        type="password"
        name='password'
        placeholder="Password"
        value={formData.password}
        onChange={handleChangeField}
        className="input"
        autoComplete='off'
      />
      </div>
      <button onClick={handleLogin} className="btnn">Login</button>
    </div>

    <Link to="/">
    <button>Back</button>
    </Link>

    
    </div>
  );
};

export default LoginPage;
