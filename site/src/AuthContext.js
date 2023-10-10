import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  username: localStorage.getItem('user') || null,
  isLoggedIn: localStorage.getItem('user') ? true : false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', action.payload);
      return { ...state, username: action.payload, isLoggedIn: true };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...state, username: null, isLoggedIn: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };


