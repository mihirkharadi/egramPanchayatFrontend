import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../css/UserComplaint.css'
import axios from 'axios';

const ComplaintForm = () => {
  const [complaintData, setComplaintData] = useState({
    name: '',
    contactDetail: '',
    complaint: '',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   


   
try {
 
 
  const response=await axios.post("http://localhost:2000/api/users/complaint-add",
    
    {
      name:complaintData.name,
      contactDetail:complaintData.contactDetail,
      complaint:complaintData.complaint,
      
      
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    
  )
  console.log('Response:', response); 
 
  setComplaintData({
    name: '',
    contactDetail: '',
    complaint: '',
  });
  alert('Your complaint has been submitted!');
} catch (error) {
  console.error("Error submitting complaint:", error);
}
    
    

   
   
  };

  return (
    <>
      <Navbar />
      <div className="complaint-container">
        <h3>Submit Your Complaint</h3>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={complaintData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactDetail">Contact Detail</label>
            <input
              className="input"
              type="text"
              id="contactDetail"
              name="contactDetail"
              value={complaintData.contactDetail}
              onChange={handleInputChange}
              placeholder="Your Email or Number"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="complaint">Complaint</label>
            <textarea
              className="input"
              id="complaint"
              name="complaint"
              value={complaintData.complaint}
              onChange={handleInputChange}
              placeholder="Describe your complaint..."
              required
              autoComplete="off"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ComplaintForm;
