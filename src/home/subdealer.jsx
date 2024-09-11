import { MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

const PAGE_SIZE = 2;

function Subdealer({ dealer }) {
  const [search, setSearch] = useState('');
  const [levelsearch, setLevelsearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filterdata = dealer.persons.filter((person) => {
    const searchperson = search === '' || 
    person.msisdn.toLowerCase().includes(search.toLowerCase()) ||
    person.dealer_name.toLowerCase().includes(search.toLowerCase());

    const matchlevel = levelsearch === '' || person.level === Number(levelsearch);
    return searchperson && matchlevel;
  });

  const totalPages = Math.ceil(filterdata.length / PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedData = filterdata.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="sm:p-4 p-2 overflow-auto">
      <div className='flex justify-between'>
        <h3 className="text-xl font-semibold mt-3">Subdealer Persons: {filterdata.length}</h3>
        <select className="bg-white border border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
          value={levelsearch}
          onChange={(e) => setLevelsearch(e.target.value)}>
          <option value="">Select level</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <form className="relative">
            <MagnifyingGlassCircleIcon className="w-8 absolute left-1 top-1 text-gray-500" />
            <input
              type="search"
              placeholder="Search dealer"
              className="rounded-md pl-10 pr-4 py-2 bg-gray-100 border border-gray-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      {dealer && dealer.persons && filterdata.length > 0 ? (
        <>
          <table className="w-full table-auto mt-4 border-collapse shadow-lg rounded-lg overflow-hidden select-none">
            <thead className="bg-ED1C29 text-white">
              <tr>  
                <th className=" px-4 py-2 text-left">ຊື່ສະມາຊິກ</th>
                <th className=" px-4 py-2 text-left">ເບີໂທ</th>
                <th className=" px-4 py-2 text-centerct">ທີ່ຢູ່</th>
                <th className=" px-4 py-2 text-left">Percentage</th>
                <th className=" px-4 py-2 text-left">Level</th>
                <th className=" px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((person) => (
                <tr key={person.member_id} className="hover:bg-gray-100">
                  <td className=" px-4 py-2 text-center">{person.dealer_name}</td>
                  <td className=" px-4 py-2 text-center">{person.msisdn}</td>
                  <td className=" px-4 py-2 text-center">{person.address}</td>
                  <td className=" px-4 py-2 text-center">{person.dealer_percentage}%</td>
                  <td className=" px-4 py-2 text-center">{person.level}</td>
                  <td className=" px-4 py-2 text-center ">
                    <span className={`rounded-full px-2 py-1 ${person.dealer_status ? 'bg-green-300 text-green-700' : 'bg-red-500'}`}>

                    {person.dealer_status ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-ED1C29'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-ED1C29'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No persons available.</p>
      )}
    </div>
  );
}

export default Subdealer;
