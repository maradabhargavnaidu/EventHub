import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GetStarted from './components/GetStarted'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Pricing from './components/Pricing'
import EventHostsSignUp from './components/EventHostsSignUp'
import HostsLogin from './components/HostsLogin'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/host-signup' element={<EventHostsSignUp />} />
          <Route path='/host-login' element={<HostsLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
