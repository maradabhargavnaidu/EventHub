import { AuthAction, Payload } from "../../types/types"

export const init: Payload = {
    isAuthenticated: false,
    isLoading: true,
    token: "",
    fullName: "",
    mail: "",
}
export const reducer = (state: any, action: AuthAction) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                fullName: action.payload.fullName,
                mail: action.payload.mail,
                isLoading: false
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                token: "",
                user: null,
            };
        default: return state;
    }
}