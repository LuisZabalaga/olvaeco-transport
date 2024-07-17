import { createContext, useContext, useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export function AuthContextProvider({ children }) {


  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  useEffect(() => {
  }, [isAuthenticated]);

  const value = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
  }), [isAuthenticated, setIsAuthenticated])

  return (
    <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>

  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.object
}

export function useAuthContext() {
  return useContext(AppContext);
}