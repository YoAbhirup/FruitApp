import React, { useState } from 'react';
import axios from 'axios';
import GridLoader from 'react-spinners/GridLoader';
import Typewriter from 'typewriter-effect';

export default function Test() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // New error state

    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset errors before request

        try {
            await axios.post('http://localhost:5000/send');
            console.log("Message sent!");

            const response = await axios.get('http://localhost:5000/receive', {
                timeout: 30000 // ⏳ Wait up to 30 seconds for a WebSocket response
            });

            if (response.data && response.data.message) {
                setData(response.data.message);
            } else {
                setError("No response from server.");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Failed to receive data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-row justify-center mt-24">
                <button 
                    onClick={fetchData} 
                    disabled={loading} 
                    className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-green-500 hover:text-white dark:text-neutral-200 transition duration-200"
                >
                    START TEST
                </button>
            </div>

            <div className="renderhere">
                {loading ? (
                    <div className="flex flex-row justify-center mt-12">
                        <GridLoader color="#0BDA51" loading={loading} size={50} />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center mt-12">{error}</div>
                ) : data ? (
                    <div className="text-xl ml-12 mr-12 mt-12">
                        <Typewriter
                            options={{ delay: 10 }}
                            onInit={(typewriter) => {
                                typewriter.typeString(data).start();
                            }}
                        />
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}
