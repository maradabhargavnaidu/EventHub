import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GetStarted from './pages/GetStarted'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import EventHostsSignUp from './pages/EventsHosts/EventHostsSignUp'
import HostsLogin from './pages/EventsHosts/HostsLogin'
import AttendeeLogin from './pages/Attendee/AttendeeLogin'
import AttendeeSignUp from './pages/Attendee/AttendeeSignUp'
import AttendeeDashboard from './pages/Attendee/AttendeeDashboard'
import AuthProvider from './context/authContext/AuthContext'
import AttendeProtectedRoute from './routes/AttendeProtectedRoute'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path='/pricing' element={<Pricing />} />

            <Route path='/host-signup' element={<EventHostsSignUp />} />
            <Route path='/host-login' element={<HostsLogin />} />

            <Route path='/attendee-login' element={<AttendeeLogin />} />
            <Route path='/attendee-signup' element={<AttendeeSignUp />} />
            <Route element={<AttendeProtectedRoute />}>
              <Route path='/attendee-dashboard' element={<AttendeeDashboard />} />
            </Route>
          </Routes>
        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
