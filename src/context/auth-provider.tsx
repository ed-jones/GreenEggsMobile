/**
 * Author: Edward Jones
 */
import React, { useState, PropsWithChildren } from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthContext, Token } from './index'

/**
 * State provider that lets all child components control the
 * authentication token of the logged in user.
 */
export function AuthProvider({ children }: PropsWithChildren<object>) {
  const [token, setToken] = useState<Token>()
  void SecureStore.getItemAsync('token').then((resolvedToken: Token) => setToken(resolvedToken))

  return <AuthContext.Provider value={{ token: token, setToken: setToken }}>{children}</AuthContext.Provider>
}
