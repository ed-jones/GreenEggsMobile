import React, { Dispatch, SetStateAction, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

import useCachedResources from "./src/core/use-cached-resources/useCachedResources";
import Welcome from "./src/screens/auth/Welcome";
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import Theme from "./src/theme/theme.json";
import Mapping from "./src/theme/mapping.json";

import { Navigation } from "@greeneggs/core";
import { useContext } from "react";
import { createUploadLink } from "apollo-upload-client";
import { AuthContext, Token } from "@greeneggs/core/auth-context/AuthContext";
import * as Screens from "@greeneggs/screens";

const Stack = createStackNavigator();

const AuthProvider = () => {
  // TODO check that token is valid

  const [token, setToken] = useState<Token>();
  SecureStore.getItemAsync("token").then((resolvedToken) =>
    setToken(resolvedToken)
  );

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
            {!Boolean(token) ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={Navigation} />
                <Stack.Screen name="Recipe" component={Screens.Recipe} />
                <Stack.Screen
                  name="RecipeDescription"
                  component={Screens.RecipeDescription}
                />
                <Stack.Screen
                  name="CreateIngredient"
                  component={Screens.CreateIngredient}
                />
                <Stack.Screen
                  name="CreateStep"
                  component={Screens.CreateStep}
                />
                <Stack.Screen
                  name="CreateCategory"
                  component={Screens.CreateCategory}
                />
                <Stack.Screen
                  name="CreateDiet"
                  component={Screens.CreateDiet}
                />
                <Stack.Screen
                  name="CreateAllergy"
                  component={Screens.CreateAllergy}
                />

                <Stack.Screen name="Settings" component={Screens.Settings} />
                <Stack.Screen
                  name="EditProfile"
                  component={Screens.EditProfile}
                />
                <Stack.Screen
                  name="EditProfilePicture"
                  component={Screens.EditProfilePicture}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={Screens.ChangePassword}
                />
                <Stack.Screen
                  name="ConnectAccounts"
                  component={Screens.ConnectAccounts}
                />
                <Stack.Screen name="SignOut" component={Screens.SignOut} />
                <Stack.Screen
                  name="DeleteAccount"
                  component={Screens.DeleteAccount}
                />
                <Stack.Screen
                  name="Diets"
                  component={Screens.DietaryPreferences}
                />
                <Stack.Screen
                  name="Allergies"
                  component={Screens.AllergyPreferences}
                />
                <Stack.Screen
                  name="ProfileVisibility"
                  component={Screens.ProfileVisibility}
                />
                <Stack.Screen
                  name="RecipeAllComments"
                  component={Screens.RecipeAllComments}
                />
                <Stack.Screen
                  name="RecipeCommentReplies"
                  component={Screens.RecipeCommentReplies}
                />
                <Stack.Screen
                  name="RecipeAllIngredients"
                  component={Screens.RecipeAllIngredients}
                />
                <Stack.Screen
                  name="RecipeDirectionExpanded"
                  component={Screens.RecipeDirectionExpanded}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
