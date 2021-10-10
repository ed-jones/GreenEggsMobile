import React from "react";
import "react-native-gesture-handler";
import { CachedResourcesProvider, GraphQLProvider, EvaProvider, AuthProvider, SearchStateProvider } from "@greeneggs/providers";
import { Router } from "@greeneggs/navigation";

export default function App() {
  return (
    <CachedResourcesProvider>
      <AuthProvider>
        <GraphQLProvider>
          <EvaProvider>
            <SearchStateProvider>
              <Router />
            </SearchStateProvider>
          </EvaProvider>
        </GraphQLProvider>
      </AuthProvider>
    </CachedResourcesProvider>
  );
}
