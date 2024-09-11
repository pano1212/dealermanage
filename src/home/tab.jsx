import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dealer from './dealer'; // Ensure this path is correct
import Groupdealer from './groupdealer'; // Ensure this path is correct
import Subdealer from './subdealer';

function Tabdealer({ tab }) {
  const [value, setValue] = useState(tab);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [error, setError] = useState(false);
  const { dealerr } = state;

  useEffect(() => {
    setValue(tab);
    setError(false);
  }, [location.pathname, tab]);

  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };

  const isPersonInvalid = !dealerr.persons || dealerr.persons.length === 0;
  const isGroupInvalid = !dealerr.groups || dealerr.groups.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200 flex flex-col space-y-2">
      <div className='w-full h-20 bg-ED1C29'></div>
      <div className="w-full flex justify-center ">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 p-5 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">

            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-800">
                <span className="text-red-600">Name:</span> {dealerr.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-red-600">Phone:</span> {dealerr.msisdn}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-red-600">Address:</span> {dealerr.address}
              </p>
            </div>

            {/* Center Column */}
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">
                <span className="text-red-600">Level:</span> {dealerr.level}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-red-600">Branch ID:</span> {dealerr.branch_id}
              </p>
            </div>

            {/* Right Column */}
            <div className="text-right space-y-2">
              <p className="text-lg">
                <span className="font-semibold text-red-600">Type:</span> {dealerr.type}
              </p>
              <p className="text-lg">
                <span className={`font-semibold ${dealerr.status ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {dealerr.status ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center px-4">

        <div className="w-full max-w-5xl mb-4">
          <div className="flex bg-white shadow-md rounded-lg">
            <button
              className={`flex-1 px-6 py-2 rounded-t-lg font-medium ${value === '1' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleButtonClick('1')}
            >
              Person
            </button>
            <button
              className={`flex-1 px-6 py-2 rounded-t-lg font-medium ${value === '2' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleButtonClick('2')}
            >
              Group
            </button>
          </div>
        </div>

        {/* Alerts and Content */}
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg px-4">
          {value === '1' && isPersonInvalid && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-center text-yellow-700 p-4 mb-4" role="alert">
              <p>No valid subdealer persons data available.</p>
            </div>
          )}
          {value === '1' && dealerr.persons && Array.isArray(dealerr.persons) && dealerr.persons.length > 0 && (
            <Subdealer dealer={dealerr} />
          )}

          {value === '2' && isGroupInvalid && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-center text-yellow-700 p-4 mb-4" role="alert">
              <p>No subdealer group data available.</p>
            </div>
          )}
          {value === '2' && dealerr.groups && Array.isArray(dealerr.groups) && dealerr.groups.length > 0 && (
            <Groupdealer dealer={dealerr} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tabdealer;
