import { useAuth } from '../hooks/useAuth'
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';

const AttendeProtectedRoute = () => {
    const { state } = useAuth();
    if (state?.isAuthenticated) return <Outlet />
    else return <Home />
}

export default AttendeProtectedRoute