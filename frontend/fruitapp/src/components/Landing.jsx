import react from 'react';
import { FlipWords } from "./ui/flip-words"
import { Link } from 'react-router-dom';

export default function Landing(){
    const flipwords = ["better", "healthy", "clean", "fresh"];

    return (
        <>
      <div className='flex flex-row' style={{fontFamily:'"Poppins", arial'}}>
        <div className='left1 mt-48 pl-24 pr-24' style={{width:'50vw'}}>
            <div className='text-6xl mb-8 font-semibold'>FruitSure</div>
            <div className='text-4xl '>
            Eat<FlipWords words={flipwords} className='text-green-600 font-semibold'/> 
            </div>
            <div className='text-2xl mt-8 font-light'>Lorem ipsum odor amet, consectetuer adipiscing elit. Odio venenatis nam rutrum, amet pellentesque pretium posuere. Et senectus dapibus maecenas nostra pharetra condimentum. Dictum massa eu maximus primis aliquam mauris mattis taciti. </div>
            <Link to="/test"><button className="mt-5 px-8 py-2 rounded-md bg-green-500 text-white text-3xl font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-500">
        Try It Now
      </button></Link>
        </div>
        <div className='right1 pl-10 '>
            <img src={'../public/original-9bbbe7f20f1dc8e095a2768922b3931c.png'} className="mt-20" style={{width:'40vw'}}></img>
        </div>
        
      </div>
      <div className='flex flex-row' style={{fontFamily:'"Poppins", arial'}}>
      <div className='left2 '>
            <img src={'../public/download.png'} className="mt-20" style={{width:'60vw'}}></img>
        </div>
        <div className='right2 mt-48 pl-24 pr-24' style={{width:'50vw'}}>
            <div className='text-5xl mb-8 '>Why <span className='text-green-500'>FruitSure</span></div>
            
            <div className='text-2xl mt-8 font-light'>Lorem ipsum odor amet, consectetuer adipiscing elit. Odio venenatis nam rutrum, amet pellentesque pretium posuere. Et senectus dapibus maecenas nostra pharetra condimentum. Dictum massa eu maximus primis aliquam mauris mattis taciti. </div>
        </div>
      </div>
      <div className='flex flex-row ' style={{fontFamily:'"Poppins", arial'}}>
        <div className='left1 mt-48 pl-24 pr-24' >
            <div className='text-9xl mb-8 font-semibold' style={{width:'30vw'}}>How Does It Work?</div>
            
            
        </div>
        <div className='right1 text-2xl pl-20 pt-64 pr-40 font-light'>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
        </div>
        
      </div>
      <div className='flex flex-row mb-10' style={{fontFamily:'"Poppins", arial'}}>
      <div className='right1 text-2xl pl-20 pt-36 pr-40 font-light'>
            <form>
              <label>Name</label>
              <input type="text" placeholder="Your Name" className="border-2 border-gray-200 w-full p-4 rounded-md focus:outline-none focus:border-green-500 mt-3 mb-5" />
              <label >Email</label>
              <input type="email" placeholder="Your Email" className="border-2 border-gray-200 w-full p-4 mt-4 rounded-md focus:outline-none focus:border-green-500 mt-3 mb-5" />
              <label >Subject</label>
              <input type="text" placeholder="Subject" className="border-2 border-gray-200 w-full p-4 mt-4 rounded-md focus:outline-none focus:border-green-500 mt-3" />
            </form>
        </div>
        <div className='left1 pl-24 pr-24' >
            <div className='text-7xl mt-64 font-semibold text-green-500' style={{width:'30vw'}}>Feel Free To Contact Us</div>
            
            
        </div>
        
        
      </div>
    </>
    )
}