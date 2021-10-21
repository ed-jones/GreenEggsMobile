/**
 * Author: Edward Jones
 */
import React, { useState, FC, Dispatch, SetStateAction, createContext } from 'react';
import * as SecureStore from 'expo-secure-store';

export type Token = string | undefined | null;
export type SetToken = Dispatch<SetStateAction<Token>> | undefined;

export const AuthContext = createContext({
  token: undefined as Token,
  setToken: undefined as SetToken,
});

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<Token>();
  SecureStore.getItemAsync("token").then((resolvedToken: Token) =>
    setToken(resolvedToken)
  );

  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
