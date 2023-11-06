import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScheme, updateScheme, deleteScheme, loadSchemes } from '../redux/slices/adminSlice';
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
      const schemeId = schemes.length + 1;
      const newSchemeData = { id: schemeId, ...newScheme };

      dispatch(addScheme(newSchemeData));
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
    console.log("schemeId: " + schemeId);
    dispatch(deleteScheme(schemeId));
    dispatch(enrollInScheme(schemeId));

    const updatedSchemes = schemes.filter((scheme) => scheme.name !== schemeId);
    dispatch(loadSchemes(updatedSchemes));
  };

  return (
    <div className='mt-5 bg-white p-5 rounded shadow-lg'>
      {isAdmin && (
        <>
          <div className="flex justify-between flex-col sm:flex-row md:flex-row gap-10">
            <div className='w-full'>
              <h2 className='text-blue-500'>Admin Scheme Management</h2>
              <h3 className='text-blue-500'>Add New Scheme:</h3>
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
            </div>

            <div className='w-full'>
              <h3 className='mt-5'>Delete Scheme:</h3>
              <select onChange={(e) => setSelectedScheme(e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select a Scheme to Delete</option>
                {schemes.map((scheme, index) => (
                  <option key={index} value={scheme.name}>
                    {scheme.name}
                  </option>
                ))}
              </select>
              <button onClick={() => handleDeleteScheme(selectedScheme)}
                className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
              >Delete Scheme</button>
            </div>
          </div>

          <div>
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
              className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
            >Update Scheme
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SchemeManagement;
