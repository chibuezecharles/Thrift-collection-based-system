import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enrollInScheme } from '../redux/slices/userSlice';

const Schemes = () => {
  const schemes = useSelector((state) => state.admin.schemes);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  
  // State to store enrolled schemes
  const [enrolledSchemes, setEnrolledSchemes] = useState([]);

  if (!schemes || schemes.length === 0) {
    // Handle the case where schemes is undefined or empty
    return (
      <div>No schemes available.</div>
    );
  }

  // Filter out schemes that the user is not enrolled in.
  const activeSchemes = schemes.filter((scheme) => !currentUser.enrolledSchemes.includes(scheme.id));

  const handleEnroll = (scheme) => {
    dispatch(enrollInScheme(scheme));
    
    // Update the list of enrolled schemes in the state
    setEnrolledSchemes(enrolledSchemes.concat(scheme));

    alert(`You have successfully enrolled in the ${scheme.name} scheme.`);
  };

  return (
    <div className="mt-5">
      <h2>View and Enroll in Schemes</h2>
      <ul className='mt-5'>
        {activeSchemes.map((scheme, index) => (
          <li key={index} className='mt-5'>
            <h3>Scheme Name: {scheme.name}</h3>
            <p>Interest Rate: {scheme.interestRate}%</p>
            <p>Maturity Date: {scheme.maturityDate}</p>
            <button onClick={() => handleEnroll(scheme)}
              className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
            >
              Enroll
            </button>
          </li>
        ))}
      </ul>

      {enrolledSchemes.length > 0 && (
        <div>
          <h2>Enrolled Schemes</h2>
          <ul>
            {enrolledSchemes.map((enrolledScheme, index) => (
              <li key={index}>
                <h3>Scheme Name: {enrolledScheme.name}</h3>
                <p>Interest Rate: {enrolledScheme.interestRate}%</p>
                <p>Maturity Date: {enrolledScheme.maturityDate}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Schemes;
