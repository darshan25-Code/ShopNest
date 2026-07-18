import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VoiceAssistant from "./components/VoiceAssistant";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
       <AppRoutes />
       <VoiceAssistant />
      </BrowserRouter>
     
    </div>
  )
}

export default App