import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import '../css/Record.css'
import axios from 'axios'

const Records = () => {
  const[records,setRecords]=useState([]);
 
useEffect(()=>
{
  const getRecord=async()=>
  {
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:2000/api/users/record-all',
     {headers:{Authorization:`Bearer ${token}`}}
    )
    
    setRecords(response.data);
  
    
    
  }
     getRecord();
     
     
},[])


  

  return (
    <>
    <Navbar/>
    <div className='scheme-container'>
    <div className="limiter">
              <div className="container-table100">
                <div className="wrap-table100">
                  <div className="table100">
                    <table>
                      <thead>
                        <tr className="table100-head">
                          <th className="column1">Id</th>
                          <th className="column2">Name</th>
                          <th className="column3">Task Date</th>
                          <th className="column4">Task Description</th>
                          <th className="column5">Cost</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {records.length > 0 ? (
                          records.map((entry) => (
                            <tr key={entry.recordId}>
                              <td className="column1 record1">{entry.recordId}</td>
                              <td className="column2 record2">{entry.staffName}</td>
                              <td className="column3 record3">{entry.taskCompletedDate}</td>
                              <td className="column4 record4">{entry.taskDescription}</td>
                              <td className="column5 record5">{entry.cost}</td>
                            
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No records available.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
   
    </div>
    <Footer/>
    </>
  )
}

export default Records