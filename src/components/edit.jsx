import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleSubmit } from '../api/dealerapi';

function Edit({ close, edit }) {
    const dealer = edit || {};

    const [data, setData] = useState({
        Users_id: dealer.Users_id || "",
        name: edit.name || "",
        Tel: edit.msisdn || "",
        adress: edit.address || "",
        type: edit.type || "",
        branch: edit.branch_id || "",
        level: edit.level || "",
        status: edit.status || "",

    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };
    const changelevel = (e) => {
        setData({
            ...data,
            level: e.target.value
        });
    };



    // Log state data for debugging
    console.log('Component Data State:', data);

    return (
        <div className="min-h-screen p-6 backdrop-brightness-75 flex items-center justify-center fixed inset-0 z-50">
            <div className="container max-w-screen-lg mx-auto">
                <div>


                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 text-gray-600">


                                    <div className="md:col-span-2">
                                        <label htmlFor="FirstName">Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="FirstName"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.name}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="SurName">ທີ່ຢູ່</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="SurName"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.adress}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label >Type</label>
                                        <input
                                            type="text"
                                            name="password"
                                            id="Address"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.type}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label >Branch</label>
                                        <input
                                            type="text"
                                            name="password"
                                            id="Birthday"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.branch}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label >Phone</label>
                                        <input
                                            type="text"
                                            name="password"
                                            id="Tel"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.Tel}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label >ສະຖານະ</label>
                                        <input
                                            type="text"
                                            name="password"
                                            id="Tel"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={data.status ? 'ON' : 'OFF'}
                                            // onChange={handleChange}
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label >Dealer level</label>
                                        <select className='w-full h-10 rounded px-4 mt-1 border bg-gray-50' value={dealer.level_id} onChange={changelevel} >

                                            <option >---{edit.level}---</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>


                                        </select>
                                    </div>


                                    <div className='md:col-span-5 justify-end flex '>
                                        <div className=" w-44 flex justify-between" >

                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                                                onClick={close}
                                            >
                                                close
                                            </button>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={(e) => handleSubmit(dealer.Users_id, data, e.preventDefault())}
                                            >
                                                Submit
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
