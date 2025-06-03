import { useQueryClient } from "@tanstack/react-query";
import { AuthAction, Payload } from "../../types/types";

export const init: Payload = {
  isAuthenticated: false,
  isLoading: true,
  token: "",
  name: "",
  mail: "",
  role: "",
};
export const reducer = (state: any, action: AuthAction) => {
  const queryClient = useQueryClient();
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        name: action.payload.name,
        mail: action.payload.mail,
        isLoading: false,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      queryClient.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        user: null,
      };
    default:
      return state;
  }
};
