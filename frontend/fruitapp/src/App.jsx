import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from "./components/Landing"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Test from './components/Test'


function App() {
  

  return (
    
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/test' element={<Test />} />
    </Routes>
      
    </>
  )
}

export default App
