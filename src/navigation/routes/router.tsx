import React, { FC, useState, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { Queries } from "@greeneggs/graphql";
import { Me } from "@greeneggs/types/graphql";
import { LoadingScreen } from "@greeneggs/screens";

import { Stack } from "../stack";
import { LoggedInRoutes } from "./logged-in-routes";
import { LoggedOutRoutes } from "./logged-out-routes";

enum SessionStates {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT,
}

const SESSION_STATE_ROUTE_MAP: Record<SessionStates, ReactNode> = {
  [SessionStates.LOADING]: <Stack.Screen name="Loading" component={LoadingScreen} />,
  [SessionStates.LOGGED_IN]: LoggedInRoutes,
  [SessionStates.LOGGED_OUT]: LoggedOutRoutes,
};

export const Router: FC = () => {
  const [sessionState, setSessionState] = useState<SessionStates>(
    SessionStates.LOADING
  );
  useQuery<Me>(Queries.ME, {
    onCompleted: (data) =>
      Boolean(data?.me.data)
        ? setSessionState(SessionStates.LOGGED_IN)
        : setSessionState(SessionStates.LOGGED_OUT),
    onError: () => setSessionState(SessionStates.LOGGED_OUT)
  });

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {SESSION_STATE_ROUTE_MAP[sessionState]}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
