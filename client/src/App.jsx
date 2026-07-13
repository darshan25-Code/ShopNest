import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      
       <AppRoutes />
      </BrowserRouter>
     
    </div>
  )
}

export default App