/**
 * Author: Edward Jones
 */
import React, { useState, Dispatch, SetStateAction, createContext, PropsWithChildren } from 'react'
import * as SecureStore from 'expo-secure-store'

export type Token = string | undefined | null
export type SetToken = Dispatch<SetStateAction<Token>> | undefined

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthContext = createContext({
  token: undefined as Token,
  setToken: undefined as SetToken,
})

/**
 * State provider that lets all child components control the
 * authentication token of the logged in user.
 */
export function AuthProvider({ children }: PropsWithChildren<object>) {
  const [token, setToken] = useState<Token>()
  void SecureStore.getItemAsync('token').then((resolvedToken: Token) => setToken(resolvedToken))

  return <AuthContext.Provider value={{ token: token, setToken: setToken }}>{children}</AuthContext.Provider>
}
