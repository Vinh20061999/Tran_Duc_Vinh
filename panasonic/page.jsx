'use client'
import { useEffect, useState } from "react"
import { DatePicker, Select, Space, Spin } from "antd"
import { useInterval, useTimeout } from "usehooks-ts"
import { Tabs } from "antd"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"
import useSWR from "swr"
import Page1 from "./page_1_Trang_Thai_May"
import Page2 from "./page_2_Thong_Tin_Bao_Tri"
import Page3 from "./page_3_Thong_Ke_SX"
import Page4 from "./page_4_giam_sat_nang_luong"

export default function Page() {
    const [pageIdx, setPageIdx] = useState(0)
    const [spinning, setSpinning] = useState(true)

    const fetcher = (url) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:3001",
        fetcher, { refreshInterval: 50 });

    useInterval(() => { }, 100)
    useEffect(() => {
        setTimeout(async () => {
            setSpinning(false);
        }, 1000)

    }, [])
    if (spinning) {
        return (
            <div className="flex justify-center items-center  bg-black 
            text-white min-w-dwh min-h-dwh overflow-visible">
                <Spin
                    spinning={spinning}
                    size="large"
                    fullscreen
                />
            </div>
        )
    }
    //{`${pageIdx + 1}`}
    return (
        <div className="ml-20">
            <div className="flex justify-center items-center bg-black text-white min-w-[640px] ">
                <Tabs
                    className='w-[100%] p-0 m-0'
                    defaultActiveKey='1'
                    activeKey={`${pageIdx + 1}`}
                    tabBarStyle={{
                        padding: 0,
                        margin: 0,
                        height: 0,
                    }}
                    items={[
                        {
                            key: '1',
                            label: 'TRẠNG THÁI MÁY',
                            children: <Page1 ></Page1>,
                        },
                        {
                            key: '2',
                            label: 'THÔNG TIN BẢO TRÌ',
                            children: <Page2 ></Page2>,
                        },
                        {
                            key: '3',
                            label: 'THÔNG KÊ SAN XUAT',
                            children: <Page3 ></Page3>,
                        },
                        {
                            key: '4',
                            label: 'GIAM SAT NANG LUONG',
                            children: <Page4 ></Page4>,
                        }
                    ]}

                />
                <div className="w-10 h-10 bg-red-500 fixed right-2 bottom-2
                rounded hover:scale-125 hover:cursor-pointer active:scale-100 border-2 border-red-600"
                    onClick={async () => {
                        let idx = pageIdx + 1;
                        if (idx >= 4) idx = 0
                        setPageIdx(idx)
                    }}>
                    <FaArrowAltCircleRight
                        className="w-8 h-8 ml-[0.12rem] mt-[0.08rem]" />
                </div>

                <div className="w-10 h-10 bg-red-500 fixed right-[3.3rem] bottom-2
                rounded hover:scale-125 hover:cursor-pointer active:scale-100 border-2 border-red-600"
                    onClick={async () => {
                        let idx = pageIdx - 1;
                        if (idx < 0) idx = 3;
                        setPageIdx(idx)
                    }}>
                    <FaArrowAltCircleLeft
                        className="w-8 h-8 ml-[0.12rem] mt-[0.08rem]" />
                </div>
            </div>
        </div>
    )
}