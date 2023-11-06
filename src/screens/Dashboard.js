import React from 'react';
import { useSelector } from 'react-redux';
import AccountDetails from '../components/AccountDetails';
import Schemes from '../components/Schemes';
import SchemeManagement from '../components/SchemeManagement';
import Payments from '../components/Payments';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  console.log(users);
  return (
    <div className='p-5 bg-gray-100 '>
      {currentUser && 
        <div>
            <AccountDetails />
          <div className='flex justify-between items-center flex-col sm:flex-row md:flex-row gap-5'>
            <Payments />
            <Schemes />
          </div>
            <SchemeManagement />
        </div>
      } 
    </div>
  );
};

export default Dashboard;
