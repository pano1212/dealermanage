import React, { useEffect, useState } from 'react';
import { getdealer } from '../api/dealerapi';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassCircleIcon, PencilIcon, EyeIcon } from '@heroicons/react/20/solid';
import { handlePreviousPage, handleNextPage, handleSearchChange, handleStartdate, handleEnddate, handleOpen, handleCLose } from '../function/function';
import Edit from '../components/edit';
import SwitchLabels from '../components/switch';

export default function Dealer() {
    const [search, setSearch] = useState('');
    const [levelsearch, setLevelsearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [showpopup, setShowpopup] = useState(false);
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(null);
    const recordsPerPage = 8;
    const navigate = useNavigate();


    const handleToggle = (userID) => async (e) => {
        const newvalue = e.target.checked;
        setData(prevdata => prevdata.map(user =>
            user.id === userID ? { ...user, status: newvalue } : user
        ));
    };

    const filteredData = data.filter((user) => {
        const usercreate = new Date(user.created_at);
        const start = startdate ? new Date(startdate) : null;
        const end = enddate ? new Date(enddate) : null;
        const withinDateRange =
            (!start || usercreate >= start) &&
            (!end || usercreate <= end);

        return withinDateRange && (
            (search.toLowerCase() === ''
                ? true
                : user.msisdn.includes(search) ||
                user.name.toLowerCase().includes(search)
            ) &&
            (levelsearch === '' || user.level === Number(levelsearch))
        );
    });

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    useEffect(() => {
        const getData = async () => {
            try {
                const dealerData = await getdealer();
                setData(dealerData);
                setError(false);
            } catch (error) {
                setData([]);
                setError(true);
            }
        };
        getData();
    }, []);

    return (
        <div className="w-screen h-screen bg-gray-50 text-gray-800 sm:w-full">
            <div className="w-full h-20 flex items-center justify-between px-4 sm:px-8 bg-red-600 shadow-md">
                {/* Header */}
            </div>
            <div className="w-full flex flex-wrap items-center justify-between px-4 sm:px-8 py-6">
                <div className="w-full sm:w-auto flex flex-wrap items-center space-x-4">
                    <h1 className="text-red-600 font-serif font-extrabold text-xl sm:text-2xl">Merchant X</h1>
                    <h1 className="text-xl sm:text-2xl font-bold">Total dealers:</h1>
                    <h1 className="text-xl sm:text-2xl font-bold">{filteredData.length}</h1>
                    <select className="bg-white border border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
                        value={levelsearch}
                        onChange={(e) => setLevelsearch(e.target.value)}>
                        <option value="">Select level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p>StartDate</p>
                    <input type="date" className="bg-white border border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
                        value={startdate}
                        onChange={(e) => handleStartdate(setStartdate(e.target.value), setCurrentPage(1))} />
                    <p>EndDate</p>
                    <input type="date" className="bg-white border border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
                        value={enddate}
                        onChange={(e) => handleEnddate(setEnddate(e.target.value), setCurrentPage(1))} />
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <form className="relative">
                        <MagnifyingGlassCircleIcon className="w-8 absolute left-1 top-1 text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search dealer"
                            className="rounded-md pl-10 pr-4 py-2 bg-gray-100 border border-gray-300"
                            onChange={(e) => handleSearchChange(setSearch(e.target.value), setCurrentPage(1))}
                        />
                    </form>
                </div>
            </div>
            {error ? (
                <div className="px-4 sm:px-8 overflow-x-auto">
                <table className="w-full table-auto bg-white border-2 border-red-600 mt-4 p-1 select-none rounded-lg overflow-auto">
                    <thead className="bg-gray-100 border-b-2 border-red-600 h-16">
                        <tr>
                            <th className="text-center py-2 border-b">ຊື່</th>
                            <th className="text-center py-2 border-b">ເບີໂທ</th>
                            <th className="text-center py-2 border-b">ທີ່ຢູ່</th>
                            <th className="text-center py-2 border-b">ປະເພດ</th>
                            <th className="text-center py-2 border-b">ສາຂາ</th>
                            <th className="text-center py-2 border-b">ລະດັບ</th>
                            <th className="text-center py-2 border-b">ສະຖານະ</th>
                            <th className="text-center py-2 border-b">ວັນເດືອນປີ</th>
                            <th className="text-center py-2 border-b">ສະຖານະ</th>
                            <th className="text-center py-2 border-b"></th>
                        </tr>
                    </thead>
                </table>
                <div className="flex justify-center items-center py-4">
                    <p className="text-gray-500">Failed to load data.</p>
                </div>
            </div>
            ) : (
                <div className="px-4 sm:px-8 overflow-x-auto">
                    <table className="w-full table-auto bg-white border-2 border-red-600 mt-4 p-1 select-none">
                        <thead className="bg-gray-100 border-b-2 border-red-600 h-16">
                            <tr>
                                <th className="text-center py-2 border-b">ຊື່</th>
                                <th className="text-center py-2 border-b">ເບີໂທ</th>
                                <th className="text-center py-2 border-b">ທີ່ຢູ່</th>
                                <th className="text-center py-2 border-b">ປະເພດ</th>
                                <th className="text-center py-2 border-b">ສາຂາ</th>
                                <th className="text-center py-2 border-b">ລະດັບ</th>
                                <th className="text-center py-2 border-b">ສະຖານະ</th>
                                <th className="text-center py-2 border-b">ວັນເດືອນປີ</th>
                                <th className="text-center py-2 border-b">ສະຖານະ</th>
                                <th className="text-center py-2 border-b"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.length > 0  ? (
                                currentRecords.map((user) => (
                                    <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-100 cursor-pointer">
                                        <td className="text-center">{user.name}</td>
                                        <td className="text-center py-3 px-2">{user.msisdn}</td>
                                        <td className="text-center">{user.address}</td>
                                        <td className="text-center">{user.type}</td>
                                        <td className="text-center">{user.branch_id}</td>
                                        <td className="text-center">{user.level}</td>
                                        <td className="text-center">
                                            <span className={`rounded-full px-2 py-1  
                                            ${user.status
                                                    ? 'bg-green-300 text-green-700'
                                                    : 'bg-red-300 text-red-700'}`}>
                                                {user.status ? "ON" : "OFF"}

                                            </span>
                                        </td>
                                        <td className="text-center">{user.created_at}</td>
                                        <td className="text-center">
                                            <SwitchLabels isToggle={user.status} handleToggle={handleToggle(user.id)} />
                                        </td>
                                        <td className="text-center">
                                            <div className="flex justify-center space-x-4">
                                                <PencilIcon className="w-4 text-yellow-500 cursor-pointer"
                                                    onClick={() => handleOpen(setShowpopup(true), setEdit(user), user)}
                                                />
                                                <EyeIcon className="w-4 text-red-600 cursor-pointer"
                                                    onClick={() => navigate('/tab', { state: { dealerr: user } })} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center py-4 text-gray-500">No records available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between px-5 border-2 border-red-600 py-2 mt-4 space-x-2 w-full">
                        <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
                            onClick={() => handlePreviousPage(currentPage, setCurrentPage, totalPages)}
                            disabled={currentPage === 1}>«</button>
                        <span className="bg-red-600 text-white py-2 px-4 rounded-md">Page {currentPage}</span>
                        <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
                            onClick={() => handleNextPage(currentPage, setCurrentPage, totalPages)}
                            disabled={currentPage === totalPages}>»</button>
                    </div>
                </div>
            )}
            {showpopup && edit &&
                <Edit
                    close={() => handleCLose(setShowpopup(false), setEdit(null))}
                    edit={edit} />}
        </div>
    );
}
