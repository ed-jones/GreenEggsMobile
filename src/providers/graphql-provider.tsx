/**
 * Author: Edward Jones
 */
import React, { FC, useContext } from 'react'
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import { AuthContext } from './auth-provider'

/**
 * Provider that lets all child components use apollo queries and mutations.
 */
export const GraphQLProvider: FC = ({ children }) => {
  const { token } = useContext(AuthContext)

  const authLink = setContext(() => ({
    headers: {
      authorization: token,
    },
  }))

  const uploadLink = createUploadLink({
    uri: process.env.API_URI,
  }) as unknown as ApolloLink

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: token ? authLink.concat(uploadLink as unknown as ApolloLink) : (uploadLink as unknown as ApolloLink),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
