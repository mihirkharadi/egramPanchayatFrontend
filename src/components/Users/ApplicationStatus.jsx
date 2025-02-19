import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../css/AppStatus.css'
import axios from 'axios';

const ApplicationStatus = () => {
    const [resolve, setResolve] = useState();
    const [complaints, setComplaints] = useState([]);

    const [isComplaint ,setIsComplaint]=useState('no')

   
  
  
     useEffect(()=>{handlePrevButton()},[])

    const handleButton=async()=>
    {
        setIsComplaint('yes')

        await axios.get('https://e-gram-panchayat.vercel.app/api/users/get-application',
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        .then((response)=>
        {
          setComplaints(response.data)
        })
        .catch(error=>console.error("Error fetching applications" , error))
    }


    
    const handlePrevButton=async()=>
    {
      setIsComplaint('no')
         await axios.get("https://e-gram-panchayat.vercel.app/api/users/complaint-all",
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
         )
         .then((response)=>
        {
          setComplaints(response.data);
         
          
          
        })
        .catch(error=>console.error("Error Fetching Complaints",error))
      
        
    }
 
    return (
      <>
        <Navbar />
        <div className="btnApp">
        <button onClick={handleButton}>Scheme</button>
        <button onClick={handlePrevButton}>Complaint</button>
        </div>
       {isComplaint==='no'&&(
        <>
          
            <>
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
                              
                            </tr>
                          ))
                        ) : (
                          <tr>
                          <td colSpan="6">No  Application Found.</td>
                        </tr>
                         
                        )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          
        </>
        )}

{isComplaint==='yes'&&(
        <>
          
            <>
              <div className="limiter">
             
                <div className="container-table100">
                  
                  <div className="wrap-table100">
                    <div className="table100">
                      <table>
                        <thead>
                          <tr className="table100-head">
                            <th className="column1">Name</th>
                            <th className="column2">Email</th>
                            <th className="column3">Number</th>
                            <th className="column4">Address</th>
                            <th className="column5">PinCode</th>
                            <th className="column6"> Status</th>
                            <th className="column7">Remarks</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {complaints.length > 0 ? (
                          complaints.map((complaint) => (
                            <tr className="res" key={complaint._id}>
                              <td className="column1 application1">{complaint.name}</td>
                              <td className="column2 application2">{complaint.email}</td>
                              <td className="column3 application3">{complaint.phone}</td>
                              <td className="column4 application4">{complaint.address}</td> 
                              <td className="column5 application5">{complaint.pinCode}</td> 
                              <td className="column6 application6">{complaint.status}</td>
                              <td className="column7 application7">{complaint.remarks}</td>

                              
                            </tr>
                          ))
                        ) : (
                          <tr>
                          <td colSpan="6">No Application Found </td>
                        </tr>
                         
                        )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
         
        </>
        )}
        
        <Footer />
      </>)
}

export default ApplicationStatus