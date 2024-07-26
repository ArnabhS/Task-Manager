import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
        <p className="text-gray-600 mb-6">
          Manage your tasks efficiently and effectively.
        </p>
        <div className="space-x-4">
          <Link href="/sign-up" className="inline-block px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700">
            
              Sign Up
           
          </Link>
          <Link href="/login" className="inline-block px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700">
              Login
          </Link>
        </div>
      </div>
    </div>
  );
}
