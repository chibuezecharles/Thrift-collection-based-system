import React, { useState } from 'react';
import { makePayment } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Payments = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditDebitCard');
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handlePayment = () => {
    if (currentUser) {
      if (paymentAmount !== '') {
        dispatch(makePayment({ amount: parseFloat(paymentAmount), paymentMethod: selectedPaymentMethod }));
        setPaymentAmount('');
      } else {
        alert('Please enter a valid payment amount.');
      }
    } else {
      alert('Please log in to make a payment.');
    }
  }

  return (
    <div className="bg-white p-5 rounded shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2 text-blue-500">Make Payments</h3>
      <p className="mb-4">
        <strong className='text-blue-500'>Name:</strong> {currentUser.fullName}
      </p>
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block text-gray-700">
          Payment Method:
        </label>
        <select
          id="paymentMethod"
          value={selectedPaymentMethod}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="creditDebitCard">Credit/Debit Card</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="paymentAmount" className="block text-gray-700">
          Payment Amount:
        </label>
        <input
          type="number"
          id="paymentAmount"
          value={paymentAmount}
          className="border rounded-md p-2 w-full"
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 px-5"
        onClick={handlePayment}
      >
        Make Payment
      </button>
    </div>
  );
};

export default Payments;
