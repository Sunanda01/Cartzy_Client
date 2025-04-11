import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">You don't have access</h1>
      <button
        onClick={() => navigate('/auth/login')}
        className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition duration-200 rounded"
      >
        Go to Home
      </button>
    </div>
  );
}

export default UnauthPage;