import { createContext } from "react";

const authContext = createContext({
  authcertifying: true,
  authenticated: false,
  permissions: [],
  user: {},
  status_manchine: "",
  _scoket: () => {},
  _handleLogin: () => {},
  _handleLoginRFID: () => {},
  _handleLogout: () => {},
  _initiateAuthentication: () => {},
});

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;
