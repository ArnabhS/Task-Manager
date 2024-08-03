// components/RatingModal.js
import React, { useState } from 'react';

const RatingModal = ({ onClose, onSave }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSave(rating);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-black">Rate the Task</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`px-4 py-2 rounded ${rating >= star ? 'bg-yellow-500' : 'bg-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
