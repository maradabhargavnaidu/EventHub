import { createContext, useEffect, useReducer } from "react";
import { init, reducer } from "./AuthReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Payload, AuthContextType } from "../../types/types";

export const AuthContext = createContext<AuthContextType>({
  state: null,
  dispatch: () => null,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, init);
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const giveAccess = async () => {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (data) {
          const { user }: { user: Payload } = data;
          dispatch({ type: "LOGIN", payload: user });
          Navigate("/dashboard");
        } else {
          dispatch({ type: "LOGOUT" });
        }
      };
      giveAccess();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
