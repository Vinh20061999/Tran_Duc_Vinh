'use client'
import useSWR from "swr";

export default function Order_Page() {

    const fetcher = (url) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:3001/Database",
        fetcher, { refreshInterval: 1000 });
    console.log("check data", data)
    const DataTable = data?.Data
    console.log("check data", data?.Data[0].id)
    console.log("check data1", DataTable)

    return (
        <>
            <div className="ml-20">
                <div>this is Order Page</div>
                <div className="  overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Data</th>
                                <th className="px-4 py-2">Model</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTable?.map(item => (
                                <tr key={item.id} className="border-b border-gray-300">
                                    <td className="px-4 py-2 text-center">{item.id}</td>
                                    <td className="px-4 py-2 text-center">{item.data}</td>
                                    <td className="px-4 py-2 text-center">{item.model}</td>
                                    <td className="px-4 py-2 text-center">{item.name}</td>
                                    <td className="px-4 py-2 text-center">{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </>

    )
}