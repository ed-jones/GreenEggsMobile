/**
 * Author: Edward Jones
 */
import React from "react";
import "react-native-gesture-handler";
import {
  CachedResourcesProvider,
  GraphQLProvider,
  EvaProvider,
  AuthProvider,
  SearchStateProvider,
  NotificationStateProvider,
  UserStateProvider,
  AddRecipeStateProvider,
} from "@greeneggs/providers";
import { Router } from "@greeneggs/navigation";

export default function App() {
  return (
    <CachedResourcesProvider>
      <AuthProvider>
        <GraphQLProvider>
          <UserStateProvider>
            <EvaProvider>
              <SearchStateProvider>
                <NotificationStateProvider>
                  <AddRecipeStateProvider>
                    <Router />
                  </AddRecipeStateProvider>
                </NotificationStateProvider>
              </SearchStateProvider>
            </EvaProvider>
          </UserStateProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  );
}
