import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';



ChartJS.register(
    ArcElement,
    Tooltip,
    Legend);



const PieChart = ({ NameMay, dataCenter }) => {
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});
    const [textCenter, setTextCenter] = useState();



    // const textCenter = {
    //     id: 'textCenter',
    //     beforeDatasetsDraw(chart, args, pluginOptions) {
    //         const { ctx, data } = chart;

    //         ctx.save();
    //         ctx.font = 'bolder 20px sans-serif';
    //         ctx.fillStyle = 'red';
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'middle';
    //         // ctx.fillText('Center Text', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    //         // ctx.fillText('30%', chart.width / 2, chart.height / 2);
    //         const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
    //         const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
    //         const dataString = JSON.stringify(dataCenter);
    //         ctx.fillText(dataString, centerX, centerY);


    //     }
    // }


    useEffect(() => {

        setChartData({
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
                {
                    label: 'Sales $',
                    data: [dataCenter, 5, 95 - dataCenter],
                    backgroundColor: [
                        'rgba(255, 0, 0, 1.0)',
                        'rgba(0, 255, 0, 1.0)',
                        'rgba(0, 0, 255, 1.0)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                }
            ]
        })

        setChartOptions({
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Hiệu xuất máy',
                    font: {
                        size: 20
                    },
                    color: '#333',
                    padding: 20,
                },

                maintainAspectRatio: false,
                responsive: true,
                cutoutPercentage: 60,
                height: '200px',
                width: "200px"
            }



        })

        setTextCenter({
            id: 'textCenter',
            afterDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data } = chart;


                ctx.font = 'bolder 20px sans-serif';
                ctx.fillStyle = 'red';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                const dataString = JSON.stringify(dataCenter);
                ctx.fillText(dataString, centerX, centerY);
                ctx.save();
            }


        })



    }, [dataCenter])


    //plugins={[textCenter]}

    return (

        <>
            <div className="space-y-1">
                <div className="w-full flex items-center justify-center bg-green-300 text rounded-lg  lg:h-[10vh]">
                    {NameMay}
                </div >

                <div className="w-full border rounded-lg p-1 bg-white">
                    <div className="flex justify-center items-center">
                        Hiệu suất máy
                    </div>
                    {/* <div className="w-full  md:col-span-2  lg:h-[35vh] h-[50vh] m-auto   rounded-lg p-1 bg-white flex items-center justify-center">

                        {textCenter && <Doughnut data={chartData} options={chartOptions} />}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div>Vinh</div>
                        </div>

                    </div> */}
                    <div className="w-full md:col-span-2 lg:h-[35vh] h-[50vh] m-auto rounded-lg p-1 bg-white flex flex-col items-center justify-center relative">
                        {textCenter && <Doughnut data={chartData} options={chartOptions} />}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div>{dataCenter}%</div>
                        </div>
                    </div>

                </div>

                <div className="border bg-white lg:h-[7vh]">
                    <div >
                        Tên Máy:
                    </div>
                    <div className="pl-20 pb-1">
                        Yamaha
                    </div>
                </div>
                <div className="border bg-white lg:h-[7vh]">
                    <div >
                        Model đang chạy:
                    </div>
                    <div className="pl-20 pb-1">
                        ABCDS
                    </div>
                </div>
                <div className="border bg-white lg:h-[7vh]">
                    <div >
                        Kế hoạch sản xuất:
                    </div>
                    <div className="pl-20 pb-1">
                        ABCD
                    </div>
                </div>
                <div className="border bg-white lg:h-[7vh]">
                    <div >
                        Số lượng sản xuất:
                    </div>
                    <div className="pl-20 pb-1">
                        ABCD
                    </div>
                </div>
                <div className="border bg-white lg:h-[7vh]">
                    <div >
                        Trạng thái máy:
                    </div>
                    <div className="pl-20 pb-1">
                        ABCD
                    </div>
                </div>


            </div>

        </>

    )
}




export default PieChart;