import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { Formik } from 'formik';
import { registrationForm } from '../FormValidation';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    role: '', // Add the "role" field
    pin: generateRandomPIN(),
  };

  const handleRegistration = (user) => {
    dispatch(registerUser(user));
    navigate('/login');
  };

  function generateRandomPIN() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let pin = '';
    for (let i = 0; i < 15; i++) {
      pin += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return pin;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationForm}
          onSubmit={(values) => handleRegistration(values)}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4" isinvalid={formik.touched.fullName && formik.errors.fullName}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="border rounded-md p-2 w-full"
                  {...formik.getFieldProps('fullName')}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <p style={{ color: 'red' }}>{formik.errors.fullName}</p>
                ) : null}
              </div>
              <div className="mb-4" isinvalid={formik.touched.email && formik.errors.email}>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="border rounded-md p-2 w-full"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p style={{ color: 'red' }}>{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="mb-4" isinvalid={formik.touched.password && formik.errors.password}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="border rounded-md p-2 w-full"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p style={{ color: 'red' }}>{formik.errors.password}</p>
                ) : null}
              </div>
              <div className="mb-4" isinvalid={formik.touched.role && formik.errors.role}>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <select
                  name="role"
                  className="border rounded-md p-2 w-full"
                  {...formik.getFieldProps('role')}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {formik.touched.role && formik.errors.role ? (
                  <p style={{ color: 'red' }}>{formik.errors.role}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 rounded transition duration-300"
              >
                Register
              </button>
              <div className="flex justify-between py-3 text-gray-700 text-sm font-medium">
                <p>Already Registered?</p>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
