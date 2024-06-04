'use client'
import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { Pie } from "react-chartjs-2";
import PieChart from "../Component/PieChart";
import useSWR from "swr";


export default function PieChart_Page() {

    const fetcher = (url) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:3001",
        fetcher, { refreshInterval: 50 });
    console.log("check data", data)
    console.log("ad", typeof (data?.CC))
    console.log("ad1", typeof (40))
    let a

    a = data?.CC


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch("http://127.0.0.1:3001")
    //         const data = await res.json()
    //         console.log("check data", data)
    //     }
    //     fetchData()
    // }, [])



    return (
        <div className="ml-20">
            {/* <Header /> */}
            <div className=" p-4 grid  lg:grid-cols-6 gap-4">
                <div>
                    <PieChart NameMay={data?.CC} dataCenter={data?.CC} />
                </div>

                <div>
                    <PieChart NameMay={"May 2"} dataCenter={40} />
                </div>
                <div>
                    <PieChart NameMay={"May 3"} dataCenter={20} />
                </div>
                <div>
                    <PieChart NameMay={"May 4"} dataCenter={50} />
                </div>
                <div>
                    <PieChart NameMay={"May 5"} dataCenter={70} />
                </div>
                <div>
                    <PieChart NameMay={"May 6"} dataCenter={50} />
                </div>
            </div>

        </div>
    )
}