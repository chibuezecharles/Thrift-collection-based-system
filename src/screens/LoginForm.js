import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { Formik } from 'formik';
import {loginForm} from '../FormValidation';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const initialValues = {
    email: '',
    password: '',
}

  const handleLogin = (values) => {
    const res = users.find((user) => user?.email === values.email && user.password === values.password);
    console.log(res)
    if(res ){
      dispatch(loginUser({...res, enrolledSchemes: []}));
      console.log("currentUser",currentUser)
      return navigate('/dashboard')
    }else{
      return navigate('/login')
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ loginForm}
          onSubmit={ (values) => handleLogin(values)}
        >  
          {
            formik => (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4" isinvalid={ formik.touched.email && formik.errors.email}>
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="border rounded-md p-2 w-full"
                    {...formik.getFieldProps('email')}
                  />
                   {
                      formik.touched.email && formik.errors.email ?
                      (<p style={{color:'red'}}>{formik.errors.email}</p>)
                      : null
                    }
                </div>
              <div className="mb-4" isinvalid={formik.touched.password && formik.errors.password}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="border rounded-md p-2 w-full"
                  {...formik.getFieldProps('password')}
                />
                 {
                    formik.touched.password && formik.errors.password? 
                    (<p style={{color:'red'}}>{formik.errors.password}</p>)
                    : null
                  }
              </div>
              <button
                type='submit'
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-300"
              >
                Login
              </button>
              <div className='flex justify-between py-3 text-gray-700 text-sm font-medium  '>
                <p>Don't Have Account?</p>
                <p className='text-blue-500 cursor-pointer'
                  onClick={() => navigate('/') }
                >
                  Register
                </p>
              </div>
          </form>
          )
          }
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
