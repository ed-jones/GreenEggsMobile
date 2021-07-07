import React, { Dispatch, SetStateAction, useState } from "react";
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
import Welcome from "./src/screens/profile/MyProfile"; // CHANGED FOR TESTING PROFILE
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import Home from "./src/screens/home/Home";
import Theme from "./src/theme/theme.json";
import Mapping from "./src/theme/mapping.json";
import { SafeAreaView } from "react-native";
import Recipe from "@greeneggs/screens/recipe/Recipe";
import RecipeDescription from "@greeneggs/screens/recipe/RecipeDescription";
import { Navigation } from "@greeneggs/core";
import { useContext } from "react";
import { AuthContext, Token } from "@greeneggs/core/auth-context/AuthContext";

const Stack = createStackNavigator();

const AuthProvider = () => {
  const [token, setToken] = useState<Token>(undefined);
  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      <App />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

function App() {
  const isLoadingComplete = useCachedResources();
  const { token } = useContext(AuthContext);

  const authLink = setContext((_request, _previousContext) => ({
    headers: {
      authorization: token,
    },
  }));

  const httpLink = createHttpLink({
    uri: process.env.API_URI,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: token ? authLink.concat(httpLink) : httpLink,
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
