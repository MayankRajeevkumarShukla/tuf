import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');

  // Fetch all features from the backend API
  const fetchFeatures = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/features');
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  // Add a new feature to the list
  const addFeature = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/features', { feature: newFeature });
      setFeatures([...features, response.data]);
      setNewFeature('');  // Clear the input field after adding
    } catch (error) {
      console.error('Error adding feature:', error);
    }
  };

  useEffect(() => {
    fetchFeatures();  // Fetch features when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">TakeUforward Platform</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-grow border p-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            placeholder="Add a new feature"
          />
          <button
            onClick={addFeature}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-900 p-3 rounded-lg shadow-sm"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
