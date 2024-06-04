import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCamera } from 'react-icons/ai';
import { RxSketchLogo, RxDashboard } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { FaChartPie } from 'react-icons/fa';

const Sidebar = ({ children }) => {
    return (
        <header className="flex">
            <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex-col justify-between">
                <div className="flex flex-col items-center">
                    <Link href='/'>
                        <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
                            <RxSketchLogo size={20} />
                        </div>
                    </Link>
                    <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
                    <Link href='/Customers'>
                        <div className="bg-gray-100 hover:bg-purple-200 cursor-pointer my-4 
                         text-white p-3 rounded-lg inline-block">
                            <RxDashboard size={20} className="text-gray-500" />
                        </div>
                    </Link>

                    <Link href='/Orders'>
                        <div className="bg-gray-100 hover:bg-purple-200 cursor-pointer my-4 
                         text-white p-3 rounded-lg inline-block">
                            <HiOutlineShoppingBag size={20} className="text-gray-500" />
                        </div>
                    </Link>

                    <Link href='/'>
                        <div className="bg-gray-100 hover:bg-purple-200 cursor-pointer my-4 
                         text-white p-3 rounded-lg inline-block">
                            <FiSettings size={20} className="text-gray-500" />
                        </div>
                    </Link>

                    <Link href='/PieCharts'>
                        <div className="bg-gray-100 hover:bg-purple-200 cursor-pointer my-4 
                         text-white p-3 rounded-lg inline-block">
                            <FaChartPie size={20} className="text-gray-500" />
                        </div>
                    </Link>


                </div>
            </div>
        </header>

    )
}


export default Sidebar;


RxSketchLogo