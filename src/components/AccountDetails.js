import React from 'react';
import { useSelector } from 'react-redux';
import Payments from './Payments';

const AccountDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const accountHistory = useSelector((state) => state.user.accountHistory);
  const currentBalance = accountHistory.reduce((total, payment) => {
    const amount = parseFloat(payment.amount);
    if (!isNaN(amount)) {
      return total + amount;
    }
    return total;
  }, 0);

  return (
    <div >
      <h1 className='text-2xl font-bold'>Welcome, {currentUser.fullName}</h1>
      <div className='my-3'>
        <h3 className='text-lg font-semibold'>Account Details:</h3>
        <p>Email: {currentUser.email}</p>
        <p>PIN: {currentUser.pin}</p>
        <p>Role: {currentUser.role}</p>
      </div>
      <div className='my-3'>
        <h3 className='text-lg font-semibold'>Account History</h3>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Payment Amount</th>
              <th className='px-4 py-2'>Payment Method</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Time</th>
            </tr>
          </thead>
          <tbody>
            {accountHistory.map((payment, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>{payment.amount}</td>
                <td className='border px-4 py-2'>{payment.paymentMethod}</td>
                <td className='border px-4 py-2'>{payment.date}</td>
                <td className='border px-4 py-2'>{payment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='my-3'>
        <p className='text-lg font-semibold'>Current Balance: {currentBalance}</p>
      </div>
      <Payments />
    </div>
  );
};

export default AccountDetails;
