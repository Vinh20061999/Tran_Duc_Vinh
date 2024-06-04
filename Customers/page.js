import React from "react"
import { data } from "../data/data"
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs'
export default function customer_Page() {
    return (
        <div className="ml-20 bg-gray-100 min-h-screen">
            <div className="flex justify-between p-4">
                <h2>Customers</h2>
                <h2>Welcome Back, Clint</h2>
            </div>

            <div className="p-4">

                <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
                    <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-2 items-center justify-between cursor-pointer">
                        <span className="sm:text-left text-right">Name</span>
                        <span className="hidden md:grid">Email</span>
                        <span className="hidden sm:grid">Last Order</span>
                        <span>Method</span>

                    </div>
                    <ul>
                        {data.map((order) => (
                            <li key={order.id} className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 
                            sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <BsPersonFill className="text-purple-800" />
                                    </div>
                                    <p className="ml-3"> {order.name.first + ' ' + order.name.last}</p>
                                </div>
                                <p className="text-gray-600 sm:text-left text-right">{order.name.first}@gmail</p>
                                <p className="hidden md:flex">{order.date}</p>
                                <div className="sm:flex hidden justify-between items-center">
                                    <p>{order.method}</p>
                                    <BsThreeDotsVertical />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}