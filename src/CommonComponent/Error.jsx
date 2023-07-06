import React from 'react';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      {/* <p className="text-gray-600 mb-6">{""}</p> */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
