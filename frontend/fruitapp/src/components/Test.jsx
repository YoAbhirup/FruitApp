import React, { useState } from 'react';
import axios from 'axios';
import GridLoader from 'react-spinners/GridLoader'
import Typewriter from 'typewriter-effect'

export default function Test() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // New state for loader

    const fetchData = async () => {
        setLoading(true); // Show loader
        try {
            const response = await axios.get('http://localhost:5000/api/data1'); // Fetch data
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div>
             <div className='flex flex-row justify-center mt-24'>
             <button onClick={fetchData} disabled={loading} className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-green-500 hover:text-white dark:text-neutral-200 transition duration-200">
        START TEST
      </button>
             </div>
            <div className='renderhere'>
                {loading ? (
                    <div className='flex flex-row justify-center mt-12'>
                        <GridLoader
                    color={'#0BDA51'}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                    </div>
                    
                ) : data ? (
                    <div className="text-xl ml-12 mr-12 mt-12">
                    <Typewriter
                    options={{
                        delay: 10, // Adjust this value to make typing faster (lower = faster)
                      }}
                      onInit={(typewriter) => {
                        typewriter.typeString(data.message)
                        
                          .callFunction(() => {
                            console.log(data.message);
                          })
                          .start();
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


