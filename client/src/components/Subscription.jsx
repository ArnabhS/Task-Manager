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
        email: 'customer@example.com', // Replace with the actual customer email
        paymentMethodId: paymentMethod.id,
      });

      router.push(`/dashboard/${userId}`);
    } catch (error) {
      console.error('Error subscribing:', error);
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Subscribe</h2>
      <p className="text-black">Subscribe to add more than 5 tasks.</p>
      <form onSubmit={handleSubmit}>
        <CardElement className="mb-4" />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
          disabled={!stripe}
        >
          Subscribe Now
        </button>
      </form>
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
