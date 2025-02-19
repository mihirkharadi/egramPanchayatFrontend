import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';

import axios from 'axios';
import '../css/UserPage.css';
import '../css/LoginPage.css';

const UserLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name:'',
    signupEmail: '',
    signupPassword: '',
    confirmPassword: '',
    mailChange: '',
    passChange: '',
    confirmPassChange: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isForget, setIsForget] = useState('no');

  const navigate = useNavigate();


  const handleChangeField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('https://e-gram-panchayat.vercel.app/api/users/login', {
        email: formData.username,
        password: formData.password,
        
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('id', user.id); 


      

      setTimeout(() => {
        navigate('/user/dashboard');
    }, 500);
      alert('Login Successful');
    } catch (error) {
      alert('Invalid credentials or user does not exist');
    }
  };

  const handleSignUp = async () => {
    if (!formData.signupEmail || 
      !formData.signupPassword ||
       !formData.confirmPassword ||
      !formData.name) {
      alert('Please fill all fields');
      return;
    }

    if (formData.signupPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post('https://e-gram-panchayat.vercel.app/api/users/signup', {
        name:formData.name,
        email: formData.signupEmail,
        password: formData.signupPassword,
      });

      alert('Account created successfully!');
      setFormData({
        signupEmail:'',
        signupPassword:'',
        confirmPassword:'',
        name:'',
      })
      navigate('/user/login');
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleForgot = () => {
    setIsForget('yes');
  };

  const handleChange = async () => {
    if (!formData.mailChange || !formData.passChange || !formData.confirmPassChange) {
      alert('Please fill all fields');
      return;
    }

    if (formData.passChange !== formData.confirmPassChange) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await axios.post('https://e-gram-panchayat.vercel.app/api/users/forgotPassword', {
        email: formData.mailChange,
        newPassword: formData.passChange,
      });

      alert('Password changed successfully!');
      setIsForget('no');
    } catch (error) {
      alert('Error resetting password!');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

const handleBack=()=>
{
  setIsForget('no');
}

  return (
    <div className="container">
      {isForget === 'no' && (
        <>
          <input type="checkbox" id="check" />
          <div className="login form">
            <header>User Login</header>
            <i className="fa-solid fa-user-tie"></i>
            <form action="#">
              <input
                type="text"
                name="username"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleChangeField}
                autoComplete='off'
              />
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChangeField}
                  autoComplete='off'
                />
                <i
                  className={`fa-solid ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <a href="#" onClick={handleForgot}>
                Forgot password?
              </a>
              <input
                type="button"
                className="button"
                value="Login"
                onClick={handleLogin}
              />
            </form>
            <div className="signup">
              <span className="signup">
                Don't have an account? <label htmlFor="check">Signup</label>
              </span>
            </div>
          </div>

          <div className="registration form">
            <header>Signup</header>
            <form action="#">
            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChangeField}
                autoComplete='off'
              />
              <input
                type="text"
                name="signupEmail"
                placeholder="Enter your email"
                value={formData.signupEmail}
                onChange={handleChangeField}
                autoComplete='off'
              />
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="signupPassword"
                  placeholder="Create a password"
                  value={formData.signupPassword}
                  onChange={handleChangeField}
                  autoComplete='off'
                />
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChangeField}
                  autoComplete='off'
                />
                <i
                  className={`fa-solid ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <input
                type="button"
                className="button"
                value="Signup"
                onClick={handleSignUp}
              />
            </form>
            <div className="signup">
              <span className="signup">
                Already have an account? <label htmlFor="check">Login</label>
              </span>
            </div>
          </div>
         <Link to="/">
         <button>Back</button></Link>
        </>
      )}

      {isForget === 'yes' && (
        <>
          <div className="login form">
            <header>Forgot Password</header>
            <form action="#">
              <input
                type="text"
                name="mailChange"
                placeholder="Enter your email"
                value={formData.mailChange}
                onChange={handleChangeField}
                autoComplete='off'
              />
              <div className="password-input-container">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="passChange"
                  placeholder="Enter New password"
                  value={formData.passChange}
                  onChange={handleChangeField}
                  autoComplete='off'
                />
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="confirmPassChange"
                  placeholder="Confirm your password"
                  value={formData.confirmPassChange}
                  onChange={handleChangeField}
                  autoComplete='off'
                />
                <i
                  className={`fa-solid ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </form>
            <button onClick={handleChange} className="forgot">
              Change
            </button>
          </div>
          <button onClick={handleBack}>Back</button>
        </>
      )}
    </div>
  );
};

export default UserLoginPage;
