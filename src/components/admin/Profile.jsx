import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    axios
      .get('https://e-gram-panchayat.vercel.app/api/users/admin-profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.admin); 
        } else {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token'); 
      });
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <>
      <Navbar />
      <div className="Dashboard">
        <div className="profile-container">
          <h3>Profile</h3>
          <div className="logo">
            <i className="fa-solid fa-user-tie"></i>
          </div>

          {userData ? (
            <div className="user-info">
              <h2>Name: {userData.name}</h2>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Role:</strong> {userData.role}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}

       
          
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
     
      
      <Footer />
    </>
  );
};

export default Dashboard;
