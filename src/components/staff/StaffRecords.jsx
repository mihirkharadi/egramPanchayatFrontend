import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import '../css/StaffRecord.css';
import axios from "axios";

const StaffRecords = () => {
  const [records, setRecords] = useState({
    recordId: "",
    staffName: "",
    taskDescription: "",
    taskCompletedDate: "",
    cost: "",
  });

  const [newEntries, setNewEntries] = useState([]);
  const [isRecord, setIsRecord] = useState("no");




 

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRecords({ ...records, [name]: value });
  };

  const handleAdd = async() => {
    try {
      const token=localStorage.getItem('token');
      
 const response=await axios.post("http://localhost:2000/api/users/record-add",
  {
    recordId:records.recordId,
    cost:records.cost,
    staffName:records.staffName,
    taskCompletedDate:records.taskCompletedDate,
    taskDescription:records.taskDescription,
    
    
  },
  {
    headers:{Authorization:`Bearer ${token}`}
  }
 )

 setRecords({
  recordId: "",
  staffName: "",
  taskDescription: "",
  taskCompletedDate: "",
  cost: "",
})

alert('record added successfully');
      
    } catch (error) {
      alert('Error adding record')
      
      
    }
  };

  const handleAddView = () => {
    setIsRecord("no");
  };

  const handleShow = async() => {
    try {
      setIsRecord("show");
      const token=localStorage.getItem('token');
       const response=await axios.get('http://localhost:2000/api/users/record-all',
        {
          headers:{Authorization:`Bearer ${token}`},
        }
       );

       setNewEntries(response.data);
       


    } catch (error) {
     console.log("no records found",error);
     
      
      
    }
    
  };
const handleDelete=async(id)=>
{
       try {
        console.log(id);
        setNewEntries((prev) => prev.filter((scheme) => scheme._id !== id));
        console.log(newEntries);
        
        
        const token=localStorage.getItem('token');
    await axios.delete(`http://localhost:2000/api/users/record-delete/${id}`,
        {
          headers:{Authorization:`Bearer ${token}`}
        },
      )
      setNewEntries((prev) => prev.filter((scheme) => scheme.id !== id));

     

       } catch (error) {
        console.error("Error deleting record",error);
       
      
       
        
       }
}
 

  return (
    <>
      <Navbar />
      <div className="scheme-container">
        <div className="btn">
          <button onClick={handleAddView} className="btn1">
            Add
          </button>
          <button onClick={handleShow} className="btn2">
            Show
          </button>
        </div>

        {isRecord === "no" && (
          <div className="Form">
            <div className="form-group">
              <label>Record Id:</label>
              <input
                autoComplete="off"
                type="text"
                name="recordId"
                value={records.recordId}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Staff Name:</label>
              <input
                autoComplete="off"
                type="text"
                name="staffName"
                value={records.staffName}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Task Completed Date:</label>
              <input
                autoComplete="off"
                type="text"
                name="taskCompletedDate"
                value={records.taskCompletedDate}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Task Description:</label>
              <textarea
                autoComplete="off"
                name="taskDescription"
                value={records.taskDescription}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Cost:</label>
              <input
                autoComplete="off"
                type="text"
                name="cost"
                value={records.cost}
                onChange={handleInput}
              />
            </div>

            <button onClick={handleAdd} className="btn3">
              Add
            </button>
          </div>
        )}

        {isRecord === "show" && (
          <>
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
                          <th className="column6"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {newEntries.length > 0 ? (
                          newEntries.map((entry) => (
                            <tr key={entry._id}>
                              <td className="column1 record1">{entry.recordId}</td>
                              <td className="column2 record2">{entry.staffName}</td>
                              <td className="column3 record3">{entry.taskCompletedDate}</td>
                              <td className="column4 record4">{entry.taskDescription}</td>
                              <td className="column5 record5">{entry.cost}</td>
                              <td className="column6">
                                <button onClick={() => handleDelete(entry._id)}>
                                  Delete
                                </button>
                              </td>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StaffRecords;
