import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enrollInScheme } from '../redux/slices/userSlice';

const Schemes = () => {
  const schemes = useSelector((state) => state.admin.schemes);
  // const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // const [newScheme, setNewScheme] = useState({
  //   name: '',
  //   interestRate: '',
  //   maturityDate: '',
  // });

  const [enrolledSchemes, setEnrolledSchemes] = useState([]);

  if (!schemes || schemes.length === 0) {
    return (
      <div>No schemes available.</div>
    );
  }

  const handleEnroll = (scheme) => {
    dispatch(enrollInScheme(scheme));
    setEnrolledSchemes(enrolledSchemes.concat(scheme));
    alert(`You have successfully enrolled in the ${scheme.name} scheme.`);
  };

  return (
    <div className="bg-white p-5 rounded shadow-lg w-full my-5 flex justify-start flex-col sm:flex-row md:flex-row gap-10">
      <div>
        <h2 className='text-blue-500'>View and Enroll in Schemes</h2>
        <ul className='mt-5'>
          {schemes.map((scheme, index) => (
            <li key={index} className='mt-5'>
              <h3>Scheme Name: {scheme.name}</h3>
              <p>Interest Rate: {scheme.interestRate}%</p>
              <p>Maturity Date: {scheme.maturityDate}</p>
              <button onClick={() => handleEnroll(scheme)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5 mt-5"
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      </div>

      {enrolledSchemes.length > 0 && (
        <div className='mb-5'>
          <h2 className='text-blue-500'>Enrolled Schemes</h2>
          <ul>
            {enrolledSchemes.map((enrolledScheme, index) => (
              <li key={index} className='mb-5'>
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
