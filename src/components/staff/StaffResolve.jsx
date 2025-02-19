import { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../css/StaffResolve.css';
import axios from 'axios';

const StaffResolve = () => {
  const [complaints, setComplaints] = useState([]); 

 
  useEffect(() => {
    axios
      .get('https://e-gram-panchayat.vercel.app/api/users/complaint-all',
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then((response) => {
        setComplaints(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);


  const handleStatus = async (_id) => {
    console.log(_id);
    
    try {
      const response = await axios.put(`https://e-gram-panchayat.vercel.app/api/users/complaints/${_id}/resolve`);
      console.log(response.data.complaint);
      
      
      if (response.data && response.data.complaint) { 
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === _id ? response.data.complaint : complaint
          )
        );
        alert('Complaint resolved successfully');
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error resolving complaint:', error);
      alert('Error resolving complaint');
    }
  };
  

  return (
    <>
      <Navbar />
      <div>
       
          <div className="limiter">
            <div className="container-table100">
              <div className="wrap-table100">
                <div className="table100">
                  <table>
                    <thead>
                      <tr className="table100-head">
                        <th className="column1">Name</th>
                        <th className="column2">Email</th>
                        <th className="column3">Complaint</th>
                        <th className="column4">Status</th>
                        <th className="column5">Resolve</th>
                      </tr>
                    </thead>
                    <tbody>
                    {complaints.length > 0 ? (
                      complaints.map((complaint) => (
                        <tr className="res" key={complaint._id}>
                          <td className="column1 resolve1">{complaint.name}</td>
                          <td className="column2 resolve2">{complaint.contactDetail}</td>
                          <td className="column3 resolve3">{complaint.complaint}</td>
                          <td className="column4 resolve4">{complaint.status}</td>
                          <td className="column5 resolve5">
                           
                            <button
                              onClick={() => handleStatus(complaint._id)}
                              disabled={complaint.status === 'resolved'} 
                            >
                              {complaint.status === 'resolved' ? 'Resolved' : 'Resolve it'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ): (
                      
                        <tr>
                        <td colSpan="6">No pending complaints .</td>
                      </tr>
                    
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
       
      </div>
      <Footer />
    </>
  );
};

export default StaffResolve;
