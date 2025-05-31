import { createContext, useEffect, useReducer } from "react";
import { init, reducer } from "./AuthReducer";
import { Payload, AuthContextType } from "../../types/types";
import { api } from "../../config/api";
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextType>({
  state: null,
  dispatch: () => null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, init);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const giveAccess = async () => {
        try {
          const { data } = await api.get("/auth/profile");
          if (data) {
            const { user }: { user: Payload } = data;
            dispatch({ type: "LOGIN", payload: user });
            toast.success("Login successful. Welcome!");
            // Navigate("/dashboard");
          } else {
            dispatch({ type: "LOGOUT" });
            toast.error("Session expired! Time to log in again.");
          }
        } catch (error: any) {
          dispatch({ type: "LOGOUT" });
          toast.error(error?.response?.data?.message);
          console.error("giveAccess error:", error);
        }
      };
      giveAccess();
    } else {
      toast.info("Please log in to access the dashboard.");
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
      {/* <Toaster /> */}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
