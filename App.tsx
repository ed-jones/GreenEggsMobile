import React from "react";
import "react-native-gesture-handler";
import { CachedResourcesProvider, GraphQLProvider, EvaProvider, AuthProvider, SearchStateProvider, NotificationStateProvider, UserStateProvider } from "@greeneggs/providers";
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
                  <Router />
                </NotificationStateProvider>
              </SearchStateProvider>
            </EvaProvider>
          </UserStateProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  );
}
