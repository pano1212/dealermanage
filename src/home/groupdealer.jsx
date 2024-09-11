import React, { useState } from 'react';
const pagesize = 1;
const subpagesize = 2;

function Groupdealer({ dealer }) {
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [currenpage, Setcurrenpage] = useState(1);
  const [subpage, Setsubpage] = useState(1);

  const totalsubpage = Math.ceil(expandedGroup ? dealer.groups.find((group) =>
    group.group_id === expandedGroup).sub.length / subpagesize : 0
  );

  const handlesubpage = (page) => {
    if (page >= 1 && page <= totalsubpage) {
      Setsubpage(page);
    }
  };
  const subData = expandedGroup
    ? dealer.groups
      .find((group) => group.group_id === expandedGroup)
      .sub.slice((subpage - 1) * subpagesize, subpage * subpagesize)
    : [];

  const totalpage = Math.ceil(dealer.groups.length / pagesize);

  const handlepage = (page) => {
    if (page >= 1 && page <= totalpage) {
      Setcurrenpage(page);
    }
  };

  const paginatedData = dealer.groups.slice((currenpage - 1) * pagesize, currenpage * pagesize);

  const toggleGroup = (groupId) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
      Setsubpage(1); 
    } else {
      setExpandedGroup(groupId); 
      Setsubpage(1); 
    }
  };

  return (
    <div className="sm:p-4 p-2 overflow-auto">
      <h3 className="text-2xl font-bold text-gray-800 ">Groups</h3>
      {dealer.groups.length > 0 ? (
        <div className="mt-2">
          <table className="w-full mt-2 table-auto border-collapse shadow-lg rounded-lg overflow-hidden select-none">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Group Name</th>
                <th className="px-4 py-2 text-left">Percentage</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Members</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData.map((group) => (
                <React.Fragment key={group.group_id}>
                  <tr
                    className="hover:bg-gray-100 cursor-pointer transition-all duration-150"
                    onClick={() => toggleGroup(group.group_id)}
                  >
                    <td className="px-4 py-2 text-gray-800 font-semibold">{group.group_name}</td>
                    <td className="px-4 py-2 text-gray-600">{group.percentage}%</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full ${group.status ? 'bg-green-200 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {group.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{group.sub.length} Members</td>
                  </tr>

                  {expandedGroup === group.group_id && (
                    <tr>
                      <td colSpan="4" className="bg-gray-50 border-t">
                        <div className="p-4">
                          <table className="w-full ">
                            <thead className="bg-gray-100 ">
                              <tr>
                                <th className="text-start px-4 py-2">Member Name</th>
                                <th className="text-start px-4 py-2">Phone</th>
                                <th className="text-left  px-4 py-2">Address</th>
                                <th className="text-start px-4 py-2">Level</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subData.map((member) => (
                                <tr key={member.member_id} className="text-gray-700 ">
                                  <td className="text-start px-4 py-2">{member.name}</td>
                                  <td className="text-start px-4 py-2">{member.msisdn}</td>
                                  <td className="text-start px-4 py-2">{member.address}</td>
                                  <td className="text-start px-4 py-2">Level {member.level}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* Subgroup Pagination */}
                          <div className="flex justify-between mt-4 items-center">
                            <button
                              className={`px-4 text-lg bg-gray-200 rounded-md ${subpage === 1 ? 'text-gray-400' : 'text-red-600 hover:bg-red-100'}`}
                              onClick={() => handlesubpage(subpage - 1)}
                              disabled={subpage === 1}
                            >
                              «
                            </button>

                            <span className="text-gray-700">
                              Page {subpage} of {totalsubpage}
                            </span>

                            <button
                              className={`px-4 text-lg bg-gray-200 rounded-md ${subpage === totalsubpage ? 'text-gray-400' : 'text-red-600 hover:bg-red-100'}`}
                              onClick={() => handlesubpage(subpage + 1)}
                              disabled={subpage === totalsubpage}
                            >
                              »
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Main Group Pagination */}
          <div className="flex justify-between mt-4 items-center">
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${currenpage === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
              onClick={() => handlepage(currenpage - 1)}
              disabled={currenpage === 1}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currenpage} of {totalpage}
            </span>

            <button
              className={`px-4 py-2 bg-gray-200 rounded-md ${currenpage === totalpage ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'}`}
              onClick={() => handlepage(currenpage + 1)}
              disabled={currenpage === totalpage}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No groups available.</p>
      )}
    </div>
  );
}

export default Groupdealer;
