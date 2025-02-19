import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import '../css/UserScheme.css';
import axios from 'axios'; 
import { FaSpinner } from "react-icons/fa";

const UserScheme = () => {
  const [state, setState] = useState({
    schemes: [],
    isApply: 'no',
    formData: {
      name: '',
      address: '',
      pinCode: '',
      email: '',
      phone: '',
      files: [],
      filePreview: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get('https://e-gram-panchayat.vercel.app/api/users/scheme-all')
      .then(response => {
        setState(prevState => ({
          ...prevState,
          schemes: response.data, 
        }));
      })
      .catch(error => console.error('Error fetching schemes:', error));
  }, []);

  const handleFileChange = (e) => {
    const allFiles = Array.from(e.target.files);
    const fileUrl = allFiles.map(file => URL.createObjectURL(file));

    setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        files: [...prevState.formData.files, ...allFiles],
        filePreview: [...prevState.formData.filePreview, ...fileUrl],
      },
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(state.formData.filePreview[index]);

    setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        files: prevState.formData.files.filter((_, i) => i !== index),
        filePreview: prevState.formData.filePreview.filter((_, i) => i !== index),
      },
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  const handleView = () => {
    setState(prevState => ({ ...prevState, isApply: 'yes' }));
  };

  const appSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  

    try {
      const data = new FormData();
      data.append("name", state.formData.name);
      data.append("email", state.formData.email);
      data.append("phone", state.formData.phone);
      data.append("address", state.formData.address);
      data.append("pinCode", state.formData.pinCode);

      state.formData.files.forEach((file) => {
        data.append("documents", file);
      });

      await axios.post('https://e-gram-panchayat.vercel.app/api/users/application', data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Application Submitted Successfully');

      setState(prevState => ({
        ...prevState,
        isApply: 'no',
        formData: {
          name: '',
          address: '',
          pinCode: '',
          email: '',
          phone: '',
          files: [],
          filePreview: [],
        },
      }));
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);  
    }
  };

  const backBtn = () => {
    setState(prevState => ({ ...prevState, isApply: 'no' }));
  };

  return (
    <>
      <Navbar />
      {state.isApply === 'no' && (
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
                          <th className="column3">Eligibility</th>
                          <th className="column4">Req Docs</th>
                          <th className="column5">Last Date</th>
                          <th className="column6"></th>
                        </tr>
                      </thead>
                      <tbody>
                      {state.schemes.length > 0 ? (
                        (state.schemes.map((scheme) => (
                          <tr key={scheme._id}>
                            <td className="column1 scheme1">{scheme.id}</td>
                            <td className="column2 scheme2">{scheme.name}</td>
                            <td className="column3 scheme3">{scheme.eligibility}</td>
                            <td className="column4 scheme4">{scheme.reqDocuments}</td>
                            <td className="column5 scheme5">{scheme.lastDate}</td>
                            <td className="column6">
                              <button onClick={handleView}>Apply</button>
                            </td>
                          </tr>
                        )))
                      ) : (

                        <tr>
                          <td colSpan="6">No schemes</td>
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

      {state.isApply === 'yes' && (
        <div className="complaint-container">
          <div className="complaint-form">
            <form onSubmit={appSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={state.formData.name} required />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="number" name="phone" onChange={handleInput} value={state.formData.phone} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" onChange={handleInput} value={state.formData.email} required />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" onChange={handleInput} value={state.formData.address} required />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input type="number" name="pinCode" onChange={handleInput} value={state.formData.pinCode} required />
              </div>

              <div className="form-group">
                <label>Upload images</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="flex flex-wrap mt-4 gap-4">
                {state.formData.filePreview.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                    <button onClick={() => handleRemoveFile(index)}>X</button>
                  </div>
                ))}
              </div>

              <button type="submit" className="submitBtn mt-3" disabled={loading}>
  {loading ? <FaSpinner className="animate-spin mr-2" /> : null} 
  {loading ? "Processing..." : "Submit"}
</button>


            </form>
          </div>
          <button onClick={backBtn} className="backBtn">Back</button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UserScheme;
