import React, { FC, useContext } from "react";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import { AuthContext } from "./auth-provider";

export const GraphQLProvider: FC = ({ children }) => {
  const { token } = useContext(AuthContext);

  const authLink = setContext((_request, _previousContext) => ({
    headers: {
      authorization: token,
    },
  }));

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const uploadLink = errorLink.concat(
    createUploadLink({
      uri: process.env.API_URI,
    }) as unknown as ApolloLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: token
      ? authLink.concat(uploadLink as unknown as ApolloLink)
      : (uploadLink as unknown as ApolloLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
