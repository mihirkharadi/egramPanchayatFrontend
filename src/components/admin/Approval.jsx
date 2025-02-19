import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import "../css/StaffApproval.css";
import axios from "axios";

const Approval = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 


  useEffect(() => {
   handleData()
   
  }, []);


const handleData=async()=>
{
  try {
   const response= await axios.get('https://e-gram-panchayat.vercel.app/api/users/get-application',
    {
      headers:
      {Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }
   );

   setSchemes(response.data);
   
   
    
  } catch (error) {
    console.error('Error Fetching details',error);
  }
}

  const handleVerify = (curElem) => {

    
    setSelectedUser(curElem);
     
  };

  const handleBack = () => {
    setSelectedUser(null); 
  };
const handleApprove=async()=>
{
  if(!selectedUser) return;
  try {
     
         const response=await axios.patch(
          `https://e-gram-panchayat.vercel.app/api/users/admin-verify/${selectedUser._id}`,
          {status:'officer_approved'},
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
         )

         alert("Application approved successfully");
         handleData();
         setSelectedUser(null);

    
      
     } catch (error) {
      console.error('Error approving applications',error);
      alert('Failed to approve application');
     }
}
const handleReject=async()=>
  {
         const remarks=window.prompt("Enter remarks :");

         if(remarks)
         {
          try {

            const response=await axios.patch(`https://e-gram-panchayat.vercel.app/api/users/admin-reject/${selectedUser._id}`,
              {status:'rejected',
                remarks:remarks,
              },
              {headers
                :{
                  Authorization:`Bearer ${localStorage.getItem('token')} `
                }
              }
            )
            
          } catch (error) {
            console.error('Error rejecting applications',error);
            alert('Failed to reject application');
          }
         }

  
  }

  return (
    <>
      <Navbar />
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
           
            {!selectedUser && schemes.length > 0 && (
              <div className="table100">
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column1">Name</th>
                      <th className="column2">Phone</th>
                      <th className="column3">Email</th>
                      <th className="column4">Address</th>
                      <th className="column5">PinCode</th>
                      <th className="column7">Status</th>
                      <th className="column6">Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schemes.map((curElem) => (
                      <tr className="res" key={curElem._id}>
                        <td className="column1 pending1">{curElem.name}</td>
                        <td className="column2 pending2">{curElem.phone}</td>
                        <td className="column3 pending3">{curElem.email}</td>
                        <td className="column4 pending4">{curElem.address}</td>
                        <td className="column5 pending5">{curElem.pinCode}</td>
                        <td className="column7 pending7">{curElem.status}</td>
                        
                        <td className="column6 pending6">
                          <button className="btn-verify" onClick={() => handleVerify(curElem)}>
                            Verify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

        
            {selectedUser && (

              
              
              <>
              
            {  console.log(selectedUser)}
              
              <div className=" p-3 rounded-lg details-box mb-3 bg-gray-900 shadow-md" >
              <h1 className="text-center text-white text-[25px] mb-2">Applicants Details</h1>
              <hr  className="mb-4"/>
                <ul className="flex gap-3 flex-wrap  mb-5" >
                  <li className="text-left text-white p-2"><strong>Name :</strong> {selectedUser.name}</li>
                  <li className="text-left text-white p-2"><strong>Phone :</strong> {selectedUser.phone}</li>
                  <li className="text-left text-white p-2"><strong>Email :</strong> {selectedUser.email}</li>
                  <li className="text-left text-white p-2"><strong>Address :</strong> {selectedUser.address}</li>
                  <li className="text-left text-white p-2"><strong>PinCode :</strong> {selectedUser.pinCode}</li>
                  <li className="text-left text-white p-2"><strong>Status :</strong> {selectedUser.status}</li>
                  
                  
                </ul>
                <h1 className="text-center text-white text-[25px] mb-2 ">Documents</h1>
                <hr  className="mb-4"/>
                {selectedUser.documents && selectedUser.documents.length > 0 && (
                    <div className="image-preview mb-3 gap-4 flex flex-wrap justify-center">
                      {selectedUser.documents.map((url, _id) => (
                        <div className="flex flex-col items-center" key={_id}>
                          <img
                            src={url.url}
                            alt={`Uploaded Document`}
                            style={{ width: "250px", height: "200px", objectFit: "contain" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
   
  
<div className=" flex flex-wrap gap-4  justify-center p-2 approvalBtn">
<button onClick={handleApprove}>Approve</button>

<button onClick={handleReject}>Reject</button>


</div>



                
              </div>

              <button className="btn-back" onClick={handleBack}>
             Back
           </button>
</>
             
            )}

            {schemes.length === 0 &&<><p>No pending approval schemes</p>
             <button className="btn-back" onClick={handleBack}>
             Back
           </button>
           </>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Approval;
