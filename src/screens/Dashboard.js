import React from 'react';
import { useSelector } from 'react-redux';
import AccountDetails from '../components/AccountDetails';
import Schemes from '../components/Schemes';
import SchemeManagement from '../components/SchemeManagement';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  console.log(users);
  return (
    <div className='p-5'>
      {currentUser && 
        <div>
          <AccountDetails />
          <Schemes />
          <SchemeManagement />
        </div>
      } 
    </div>
  );
};

export default Dashboard;
