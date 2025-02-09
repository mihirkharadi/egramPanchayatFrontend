import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "../css/Scheme.css";

import Footer from "../common/Footer";
import Navbar from "../common/Navbar";


const Schemes = () => {
  const [state, setState] = useState({
    entries: {
      id: "",
      name: "",
      reqDocuments: "",
      eligibility: "",
      lastDate: "",
    },
    newEntries: [],
    viewMode: "add",
  });

  const handleShow = () => {
    
    axios.get("http://localhost:2000/api/users/scheme-all")
      .then((response) => {
       
        setState((prevState) => ({
          ...prevState,
          newEntries: response.data,
          viewMode: "show",
        }));
      })
      .catch((error) => console.error("Error fetching schemes:", error));
  };
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      entries: { ...prevState.entries, [name]: value },
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { entries } = state;

    if (!entries.id || !entries.name || !entries.reqDocuments || !entries.eligibility || !entries.lastDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api/users/scheme-add", entries);
      setState((prevState) => ({
        entries: { id: "", name: "", reqDocuments: "", eligibility: "", lastDate: "" },
        newEntries: [response.data, ...prevState.newEntries],

        viewMode: "add",
      }));
      alert('Scheme added successfully')
     
      
     
      
      
    } catch (error) {
      console.error("Error adding scheme:", error);
    }
  };

  

  const handleAddView = () => {
    setState((prevState) => ({ ...prevState, viewMode: "add" }));
  };

  const handleDelete = async (_id) => {
    try {
      console.log(_id);
      
      await axios.delete(`http://localhost:2000/api/users/delete/${_id}`);
     
      setState((prevState) => ({
        ...prevState,
        newEntries: prevState.newEntries.filter((scheme) => scheme._id !== _id),
      }));
    } catch (error) {
      console.error("Error deleting scheme:", error);
    }
  };

  const { entries, newEntries, viewMode } = state;

  return (
    <>
      <Navbar />
      <div className="scheme-container">
        <div className="header">
          <h1>Schemes</h1>
        </div>

        <div className="btn">
          <button onClick={handleAddView} className="btn1">Add</button>
          <button onClick={handleShow} className="btn2">Show</button>
        </div>

        {viewMode === "add" && (
          <div className="Form">
            <div className="form-group">
              <label>Scheme Id :</label>
              <input autoComplete="off" type="text" name="id" value={entries.id} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label>Name :</label>
              <input autoComplete="off" type="text" name="name" value={entries.name} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label>Eligibility :</label>
              <input autoComplete="off" type="text" name="eligibility" value={entries.eligibility} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label>Req Docs :</label>
              <textarea autoComplete="off" name="reqDocuments" value={entries.reqDocuments} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label>Last Date :</label>
              <input autoComplete="off" type="text" name="lastDate" value={entries.lastDate} onChange={handleInput} />
            </div>
            <button onClick={handleAdd} className="btn3">Add</button>
          </div>
        )}

        {viewMode === "show" && (
          <div className="limiter">
            <div className="container-table100">
              <div className="wrap-table100">
                <div className="table100">
                  <table>
                    <thead>
                      <tr className="table100-head">
                        <th className="column1">Id</th>
                        <th className="column2">Name</th>
                        <th className="column3">Eligibility</th>
                        <th className="column4">Req Docs</th>
                        <th className="column5">Last Date</th>
                        <th className="column6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {newEntries.length > 0 ? (
                        newEntries.map((curElem) => (
                          <tr key={curElem._id}>
                            <td className="column1 scheme1">{curElem.id}</td>
                            <td className="column2 scheme2">{curElem.name}</td>
                            <td className="column3 scheme3">{curElem.eligibility}</td>
                            <td className="column4 scheme4">{curElem.reqDocuments}</td>
                            <td className="column5 scheme5">{curElem.lastDate}</td>
                            <td className="column6 scheme6">
                              <button onClick={() => handleDelete(curElem._id)}>Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No schemes added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Schemes;
