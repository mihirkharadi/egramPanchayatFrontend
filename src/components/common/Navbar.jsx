import React, { useState ,useEffect } from 'react';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';







const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const[role,setRole]=useState(null);


 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
setRole(decoded.role);
  }
}, []);


 

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="dashboard-container">
        <h1>eGramPanchayat</h1>
        
        <p>
          <i onClick={toggleSidebar} className="fa-solid fa-bars"></i>
        </p>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>

        {role === 'admin' && (
          <ul>
            <li><a href="/admin/dashboard/profile">Profile</a></li>
            <li><a href="/admin/dashboard/schemes">Schemes</a></li>
            <li><a href="/admin/dashboard/approval">Approval</a></li>
            <li><a href="/admin/dashboard/records">Records</a></li>
            <li><a href="/admin/dashboard/documents-issue">Documents</a></li>
          </ul>
        )}

        {role === 'staff' && (
          <ul>
            <li><a href="/staff/dashboard/profile">Profile</a></li>
            <li><a href="/staff/dashboard/approval">Approval</a></li>
            <li><a href="/staff/dashboard/records">Records</a></li>
            <li><a href="/staff/dashboard/problem">Problems</a></li>
          </ul>
        )}

        {role === 'user' && (
          <ul>
            <li><a href="/user/dashboard/profile">Profile</a></li>
            <li><a href="/user/dashboard/schemes">Schemes</a></li>
            <li><a href="/user/dashboard/application-status">Application Status</a></li>
            <li><a href="/user/dashboard/complain">Complain</a></li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
