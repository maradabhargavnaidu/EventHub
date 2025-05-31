import { useAuth } from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
// import Home from '../pages/Home';

const AttendeProtectedRoute = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  if (state?.isAuthenticated) return <Outlet />;
  else {
    navigate("/");
  }
};

export default AttendeProtectedRoute;
