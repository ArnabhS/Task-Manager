'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/signup', { name, email, password });
      alert('User registered successfully');
      router.push("/login")
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border text-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link href="/login" className="text-indigo-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
