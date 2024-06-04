'use client'
import { useEffect, useState } from "react"
import { useInterval, useTimeout } from "usehooks-ts"
import ReactECharts from 'echarts-for-react';
import useSWR from "swr";

export default function Page1() {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const fetcher = (url) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:3001",
        fetcher, { refreshInterval: 10 });


    useInterval(async () => {
        let dt = new Date()
        let t = dt.getHours().toString().padStart(2, '0')
        t += ':' + dt.getMinutes().toString().padStart(2, '0')
        t += ':' + dt.getSeconds().toString().padStart(2, '0')
        setTime(t)

        let d = dt.getDate().toString().padStart(2, '0')
        d += '/' + (dt.getMonth() + 1).toString().padStart(2, '0')
        d += '/' + dt.getFullYear().toString().padStart(2, '0')
        setDate(d)

    })
    return (
        <div className="text-white flex flex-col bg-black min-h-dvh w-[calc(100%-5px)] md:w-[100%] select-none ">
            <div className="flex flex-row  ">
                <div className="font-bold text-3xl p-2">{time}</div>
                <div className="flex-1 text-3xl font-bold text-center p-4">
                    TRẠNG THÁI MÁY
                </div>
                <div className="font-bold text-3xl p-2 text-right">{date}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-x-2 gap-y-4 min-h-[cals(100vh-8rem)]">
                {/* May 1 */}
                <div>
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 1
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >

                </div >
                {/* May 2 */}
                <div>
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 2
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >

                </div >
                {/* May 3 */}
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 3
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >
                {/* May 4 */}
                <div>
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 4
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >

                </div >
                {/* May 5 */}
                <div>
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 5
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >

                </div >
                {/* May 6 */}
                <div>
                    <div className={`flex bg-gray-300 flex-col w-full rounded-lg gap-1 select-none
                    ${data?.Trang_Thai_May == 0
                            ? `bg-black`
                            : `${data?.Trang_Thai_May == 1
                                ? `bg-red-500`
                                : `${data?.Trang_Thai_May == 2
                                    ? `bg-orange-500`
                                    : `${data?.Trang_Thai_May == 4
                                        ? `bg-green-600`
                                        : `bg-gray-500`
                                    }`
                                }`
                            }

                    `}`} >
                        <div className="text-center font-bold text-3xl py-4 rounded-t-lg">
                            May 6
                        </div>
                        <div className="flex flex-col flex-1  text-center items-center p-1">
                            {/* Biểu đồ */}
                            <div className="bg-black w-full">
                                <div className="text-center font-bold p-2 text-lg">
                                    Hiệu suất máy
                                </div>
                                <div className="relative flex flex-1 text-xl font-bold items-center justify-center">
                                    <div className=" absolute text-center flex-1 z-50 text-3xl font-bold">
                                        {data?.Trang_Thai_May || 0}%
                                    </div>
                                    <ReactECharts
                                        className={`max-h-[calc(100vh/4)] w-[calc(100vw/1.2)] md:w-[calc(100vw/3)] lg:w-[calc(100vw/4)] 2xl:w-[calc(100vw/7)]`}
                                        lazyUpdate={true}
                                        notMerge={false}
                                        option={{
                                            tooltip: {
                                                renderMode: 'richText',
                                                trigger: 'item',
                                                backgroundColor: '##00000088',
                                                texStyle: {
                                                    color: '#ffffff',
                                                    fontSize: 18,
                                                },

                                            },
                                            legend: {
                                                show: false,
                                                top: '5%',
                                                left: 'center',
                                            },
                                            animation: false,
                                            series: [
                                                {
                                                    name: '',
                                                    type: 'pie',
                                                    radius: ['50%', '95%'],
                                                    center: ['50%', '50%'],
                                                    avoidLabelOverlap: true,
                                                    startAngle: 180,
                                                    label: {
                                                        show: false,
                                                        position: 'center',
                                                    },
                                                    itemStyle: {
                                                        borderRadius: 3,
                                                    },
                                                    data: [
                                                        10,
                                                        0.1,
                                                        20,
                                                        0.1,
                                                        30,
                                                        0.1

                                                    ],
                                                    color: [
                                                        'rgb(0,255,0)',
                                                        'rgb(0,0,255)',
                                                        '#fff',
                                                        '#303030',
                                                    ],
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                        },
                                                        disabled: false,
                                                    },
                                                }
                                            ]

                                        }}
                                    />
                                </div>
                            </div>
                            {/* Thông tin máy */}
                            <div className=" grid grid-rows-5 gap-1  w-full bg-black">
                                {/* tên máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Tên Máy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        Manda
                                    </div>
                                </div>
                                {/* Model đang chạy */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Model đang chạy </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.Model_May_1 || 0}
                                    </div>
                                </div>
                                {/* Kế hoạch sản xuất */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Kế hoạch sản xuất </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.ke_hoach_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Số lượng đã sản xuất */}
                                <div className="bg-[#222]" >
                                    <div className="text-[#ccc] text-left">Số lượng đã sản xuât </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {data?.so_luong_san_xuat || 0}
                                    </div>
                                </div>
                                {/* Trạng thái máy */}
                                <div className="bg-[#222]">
                                    <div className="text-[#ccc] text-left">Trang thai cua may </div>
                                    <div className={`text-center ${window.innerHeight < 1015 ? 'min-h-12' : 'min-h-16'}
                                    flex items-center justify-center font-bold text-xl`}>
                                        {`${data?.Trang_Thai_May == 0
                                            ? `ĐANG TẮT`
                                            : `${data?.Trang_Thai_May == 1
                                                ? `ĐANG LỖI`
                                                : `${data?.Trang_Thai_May == 2
                                                    ? `ĐANG DỪNG`
                                                    : `${data?.Trang_Thai_May == 4
                                                        ? `ĐANG CHẠY`
                                                        : `MẤT KẾT NỐI`
                                                    }`
                                                }`
                                            }`
                                            }`}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div >

                </div >
            </div >
            <div className="flex flex-row h-[2.9rem] items-center justify-center">
                <div className="h-[2rem] w-20 bg-green-600 rounded-sm"></div>
                <div className="font-bold text-lg mr-10">MÁY CHẠY</div>
                <div className="h-[2rem] w-20 bg-red-700 rounded-sm"></div>
                <div className="font-bold text-lg mr-10">MÁY LỖI</div>
                <div className="h-[2rem] w-20 bg-orange-400 rounded-sm"></div>
                <div className="font-bold text-lg mr-10">MÁY DỪNG</div>
                <div className="h-[2rem] w-20 bg-[#323232] rounded-sm"></div>
                <div className="font-bold text-lg mr-10">MÁY TẮT</div>
            </div>
        </div >
    )
}