export type AuthAction =
  | { type: "LOGIN"; payload: Payload }
  | { type: "LOGOUT" };

export type Payload = {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  name: string;
  mail: string;
  role: string;
};

export type AuthContextType = {
  state: Payload | null;
  dispatch: React.Dispatch<AuthAction>;
};
