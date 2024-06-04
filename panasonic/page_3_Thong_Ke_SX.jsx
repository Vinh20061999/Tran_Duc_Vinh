'use client'
import React, { useState } from 'react'
import axios from 'axios'
export default function Page3() {
    const MyComponent = () => {
        const [responseMessage, setResponseMessage] = useState('');

        const handleButtonClick = async () => {
            try {
                const response = await axios.post('/api/a', {
                    // Dữ liệu bạn muốn gửi lên API
                    key1: 'value1',
                    key2: 'value2',
                });

                // Xử lý dữ liệu phản hồi (nếu cần)
                setResponseMessage(response.data.message);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi (nếu có)
            }
        }
    }
    return (
        <>

            <div className="text-white">
                this is page 3
            </div>
            <div className="text-white" onClick={handleButtonClick}>
                click
            </div>
        </>

    )
}