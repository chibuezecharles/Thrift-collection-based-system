import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScheme, updateScheme, deleteScheme,loadSchemes, } from '../redux/slices/adminSlice';
import { enrollInScheme } from '../redux/slices/userSlice'; 

const SchemeManagement = () => {
  const dispatch = useDispatch();
  const schemes = useSelector((state) => state.admin.schemes);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.role === 'admin';

  const [newScheme, setNewScheme] = useState({
    name: '',
    interestRate: '',
    maturityDate: '',
  });

  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleAddScheme = () => {
    if (newScheme.name && newScheme.interestRate && newScheme.maturityDate) {
      dispatch(addScheme(newScheme));
      setNewScheme({ name: '', interestRate: '', maturityDate: '' });
    }
  };

  const handleUpdateScheme = () => {
    if (selectedScheme) {
      dispatch(updateScheme(selectedScheme));
      setSelectedScheme(null);
    }
  };

  const handleDeleteScheme = (schemeId) => {
    // Dispatch an action to delete the scheme in the admin slice
    dispatch(deleteScheme(schemeId));
    console.log(schemeId)
    // Remove the scheme from the user enrollments
    dispatch(enrollInScheme(schemeId));
  
    // Filter out the deleted scheme from the schemes state
    const updatedSchemes = schemes.filter((scheme) => scheme.name !== selectedScheme);
    console.log("updatedSchemes",updatedSchemes)
    dispatch(loadSchemes(updatedSchemes));  // Dispatch action to update the schemes state
  };

  return (
    <div className='mt-5'>
      {
        isAdmin && 
        <>
          <h2>Admin Scheme Management</h2>
          <h3>Add New Scheme:</h3>
        <div className='mt-3'>
          <label>Scheme Name</label>
            <input
              type="text"
              placeholder="Scheme Name"
              value={newScheme.name}
              className="border rounded-md p-2 w-full "
              onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
            />
        </div>
          <div className='mt-3'>
            <label>Interest Rate</label>
            <input
              type="number"
              placeholder="Interest Rate"
              value={newScheme.interestRate}
              className="border rounded-md p-2 w-full"
              onChange={(e) => setNewScheme({ ...newScheme, interestRate: e.target.value })}
            />
          </div>
          <div className='mt-3'>
            <label>Maturity Date</label>
            <input
              type="date"
              placeholder="Maturity Date"
              value={newScheme.maturityDate}
              className="border rounded-md p-2 w-full mt-3"
              onChange={(e) => setNewScheme({ ...newScheme, maturityDate: e.target.value })}
            />
          </div>
          <button onClick={handleAddScheme}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
          >
            Add Scheme
          </button>

          <h3 className='mt-5'>Update Scheme:</h3>
          <select onChange={(e) => setSelectedScheme(e.target.value)}>
            <option value="">Select a Scheme to Update</option>
            {schemes.map((scheme, index) => (
              <option key={index} value={scheme.id}>
                {scheme.name}
              </option>
            ))}
          </select>
          <button onClick={handleUpdateScheme}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
          >Update Scheme
          </button>

          <h3 className='mt-5'>Delete Scheme:</h3>
          <select onChange={(e) => setSelectedScheme(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select a Scheme to Delete</option>
            {schemes.map((scheme,index) => (
              <option key={index} value={scheme.id}>
                {scheme.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleDeleteScheme(selectedScheme)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
          >Delete Scheme</button>
      </>
    }
    </div>
  );
};

export default SchemeManagement;
