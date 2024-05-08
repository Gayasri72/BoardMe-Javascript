// Packages.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Packages() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/package");
        if (response.data.success) {
          setDataList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">You can Buy your Packages</h1>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dataList.length > 0 ? (
              dataList.map((pkg) => (
                <div key={pkg._id} className="bg-white overflow-hidden shadow-lg rounded-lg p-6">
                  <div className="px-4 py-5 sm:p-6">
                  <h1 className="text-3xl font-medium text-gray-900">{pkg.pac_name}</h1>

                    <p className="mt-2 text-base text-gray-700">{pkg.features}</p>
                    <div className="mt-4 flex justify-between">
                      <p className="text-lg font-medium text-gray-900">${pkg.price}</p>
                      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No data</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Packages;
