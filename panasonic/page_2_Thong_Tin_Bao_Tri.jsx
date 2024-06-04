'use client'
import { DatePicker, Select } from "antd"
import { useEffect, useState } from "react"
import { useInterval, useTimeout } from "usehooks-ts"
import { fetcheAllUser, postUser } from "../services/userServices"
import Item from "antd/es/list/Item"
import axios from "axios"
import moment from 'moment'

export default function Page2() {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [listUser, setListUser] = useState([])
    const [selectMachine, setSelectMachine] = useState('0')
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)


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

    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = async () => {
        let res = await fetcheAllUser()
        // console.log(res.data)


    }

    const handleSelectMachine = (value) => {
        setSelectMachine(value)
        console.log(value)
    }

    const handlePostUser = async () => {
        // let res = await postUser()
        // console.log("check state", res)

        const name = 20;
        const age = 20;
        const data = {
            name: 'vinh',
            age: 20,
            ID_May: selectMachine,
            dateFrom: dateFrom,
            dateTo: dateTo
        }

        try {
            const response = await axios.post('http://localhost:3001/api', { data });
            console.log('Response data:', response.data.data);
            if (response && response.data && response.data.data) {
                setListUser(response.data.data)
            }

        } catch (error) {
            console.error('Error posting data:', error.message);
        }
    }

    // function onChange_Date_from(date, dateString) {
    //     setDatFrom(dateString)
    //     console.log(dateString)
    // }
    const onChangeDateFrom = (date, dateString) => {
        console.log(date, dateString)
        setDateFrom(dateString)

    }
    const onChangeDateTo = (date, dateString) => {
        console.log(date, dateString)
        setDateTo(dateString)

    }

    return (

        <div className="bg-black w-[calc(100%-5px)] min-h-dvh">
            <div className=" text-white flex flex-row">
                <div className="font-bold text-3xl p-2">{time}</div>
                <div className="flex-1 font-bold text-center p-4 text-3xl"> XUẤT BÁO CÁO</div>
                <div className="font-bold text-3xl p-2 text-right">{date}</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-12 gap-2 p-2 font-bold">
                <div className="text-white flex items-center justify-center">Tên máy</div>
                <Select
                    value={selectMachine}
                    dropdownStyle={{}}
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        height: 42,
                    }}
                    onChange={handleSelectMachine}
                    options={[
                        { value: 'May_1', label: 'Tên Máy 1' },
                        { value: 'May_2', label: 'Tên Máy 2' },
                        { value: '2', label: 'Tên Máy 3' },
                        { value: '3', label: 'Tên Máy 4' },
                        { value: '4', label: 'Tên Máy 5' },
                        { value: '5', label: 'Tên Máy 6' },

                    ]}
                />
                <div className="text-white flex items-center text-right justify-center">Từ ngày</div>
                <DatePicker
                    onChange={onChangeDateFrom}
                    value={dateFrom ? moment(dateFrom) : null}
                />
                <div className="text-white flex items-center text-right justify-center">Đến ngày</div>
                <DatePicker
                    onChange={onChangeDateTo}
                    value={dateTo ? moment(dateTo) : null}
                />
                <div className="col-span-2 grid grid-cols-2 gap-2 *:py-2 lg:col-span-6 ">
                    <div onClick={() => handlePostUser()} className="bg-green-600 rounded-md hover:bg-green-500 active:bg-green-600 hover:cursor-pointer justify-center items-center flex">
                        Tìm Kiếm
                    </div>
                    <div className="bg-orange-600 rounded-md hover:bg-orange-500 active:bg-orange-600 hover:cursor-pointer justify-center items-center flex">
                        Xuất File
                    </div>
                </div>




            </div>

            <div className="mt-8">
                <table
                    className=" bg-[#222] text-white table table-auto w-full border-separate">
                    <thead>
                        <tr className="text-white bg-[#004] text-sm sticky *:ring-2 *:ring-[#ffff] *:text-lg">
                            <th className="p-2">Thời gian bắt đầu</th>
                            <th className="p-2">Thời gian kết thúc</th>
                            <th className="p-2">Model sản xuất</th>
                            <th className="p-2">Kế hoạch sản xuất <br />(PCS)</th>
                            <th className="p-2">Số lượng chạy test <br />(PCS)</th>
                            <th className="p-2">Thời gian chạy máy <br />(PCS)</th>
                            <th className="p-2">Thời gian dừng máy <br />(PCS)</th>
                            <th className="p-2">Hiệu suất máy <br />(%)</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            listUser && listUser.length > 0 &&
                            listUser.map((Item, index) => {
                                return (
                                    <tr className="*:text-black *:bg-white *:text-center" key={`users-${index}`}>
                                        <td> {Item.name}</td>
                                        <td> abc</td>
                                        <td> {Item.model}</td>
                                        <td> abc</td>
                                        <td> abc</td>
                                        <td> abc</td>
                                        <td> abc</td>
                                        <td> abc</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>

    )
}