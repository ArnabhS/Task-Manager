"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PjQ85P6YV8biLHzxrunDxuHzKaeqoGM8vAb1Che790rXsV0mDdqlljUgs5e92CFNVfYvBL8xhWj8eLoTkDFLgJ700xI5BWmfE'); // Replace with your actual publishable key

const CheckoutForm = ({ userId }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/user/${userId}/subscribe`, {
        email, 
        paymentMethodId: paymentMethod.id,
      });
      alert("subscription successfull")
      router.push(`/dashboard/${userId}`);
    } catch (error) {
      console.error('Error subscribing:', error);
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className='bg-white h-screen w-full flex items-center'>
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-4 text-black">Subscribe</h2>
      <p className="text-black">Subscribe to add more than 5 tasks.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <CardElement className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 mt-4 w-full"
          disabled={!stripe}
        >
          Subscribe Now
        </button>
      </form>
    </div>
    </div>
  );
};

const Subscribe = ({ userId }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm userId={userId} />
    </Elements>
  );
};

export default Subscribe;
