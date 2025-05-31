import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import AuthProvider from "./context/authContext/AuthContext";
import Loader from "./components/Loader";
import Navbar from "./components/home/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));
const EventHostsSignUp = lazy(
  () => import("./pages/EventsHosts/EventHostsSignUp")
);
const HostsLogin = lazy(() => import("./pages/EventsHosts/HostsLogin"));
const AttendeeLogin = lazy(() => import("./pages/Attendee/AttendeeLogin"));
const AttendeeSignUp = lazy(() => import("./pages/Attendee/AttendeeSignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const AttendeProtectedRoute = lazy(
  () => import("./routes/AttendeProtectedRoute")
);
const CreateEvent = lazy(() => import("./pages/Dashboard/CreateEvent"));
const ViewDetails = lazy(() => import("./pages/Dashboard/ViewDetails"));
const Layout = lazy(() => import("./layout/layout"));

const queryClient = new QueryClient({});

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/dashboard", "/create", /^\/view-event\/.+/];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    route instanceof RegExp
      ? route.test(location.pathname)
      : route === location.pathname
  );
  return (
    <AuthProvider>
      {!shouldHideNavbar && <Navbar />}
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/host-signup" element={<EventHostsSignUp />} />
            <Route path="/host-login" element={<HostsLogin />} />
            <Route path="/attendee-login" element={<AttendeeLogin />} />
            <Route path="/attendee-signup" element={<AttendeeSignUp />} />
            <Route element={<AttendeProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateEvent />} />
                <Route path="/view-event/:id" element={<ViewDetails />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
      <Toaster
        position="top-right"
        expand={true}
        toastOptions={{
          style: {
            marginBottom: "12px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
