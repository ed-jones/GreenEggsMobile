import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./src/core/use-cached-resources/useCachedResources";
import Welcome from "./src/screens/auth/Welcome";
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import Home from "./src/screens/home/Home";
import Theme from "./src/theme/theme.json";
import Mapping from "./src/theme/mapping.json";
import { SafeAreaView } from "react-native";
import Recipe from "@greeneggs/screens/recipe/Recipe";
import RecipeDescription from "@greeneggs/screens/recipe/RecipeDescription";
import { Navigation } from "@greeneggs/core";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  const authLink = setContext((_request, _previousContext) => ({
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzczMjViLWRjODEtNGQ4NS04ZGMyLTBjZGYxMjZhNTk3MiIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IlNtaXRoIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkallJRnVublFTQk9FRkl3ZmVzUE5GdWRRMnBWL0lnV1ZRVDdQZkdCS1dJT2s2Snd4VnU0TU8iLCJhdmF0YXJVUkkiOm51bGwsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjI1Mjg3NzY1fQ.EOD0i4-OYVaMeC8QKwCwzDNM-lwnLAvLni6ZC7l9DNM",
    },
  }));

  const httpLink = createHttpLink({
    uri: process.env.API_URI,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...Theme }}
        customMapping={Mapping}
      >
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Navigation} />
            <Stack.Screen name="Recipe" component={Recipe} />
            <Stack.Screen
              name="RecipeDescription"
              component={RecipeDescription}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
