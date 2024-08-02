"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Subscribe = ({ userId }) => {
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}/subscribe`, {}, {
        withCredentials: true,
      });
      router.push(`/dashboard/${userId}`);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Subscribe</h2>
      <p className='text-black'>Subscribe to add more than 5 tasks.</p>
      <button
        onClick={handleSubscribe}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
      >
        Subscribe Now
      </button>
    </div>
  );
};

export default Subscribe;
